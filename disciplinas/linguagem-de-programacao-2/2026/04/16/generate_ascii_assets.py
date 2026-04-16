from __future__ import annotations

import struct
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as exc:  # pragma: no cover - helpful runtime message
    raise SystemExit(
        "Pillow is required. Install it with: pip install pillow"
    ) from exc


def parse_markdown_row(line: str) -> list[str]:
    """Split a Markdown table row by unescaped pipes."""
    text = line.strip()
    if not text.startswith("|") or not text.endswith("|"):
        return []

    text = text[1:-1]
    cells: list[str] = []
    current: list[str] = []
    escaped = False

    for ch in text:
        if escaped:
            current.append(ch)
            escaped = False
            continue
        if ch == "\\":
            escaped = True
            continue
        if ch == "|":
            cells.append("".join(current).strip())
            current = []
            continue
        current.append(ch)

    cells.append("".join(current).strip())
    return cells


def is_separator_row(cells: list[str]) -> bool:
    """Detect rows like: |---:|:---|---|"""
    if not cells:
        return False
    for cell in cells:
        cleaned = cell.replace(":", "").replace("-", "").strip()
        if cleaned:
            return False
    return True


def markdown_to_ascii_lines(markdown_path: Path) -> list[str]:
    rows: list[list[str]] = []

    for raw_line in markdown_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line.startswith("|"):
            continue
        cells = parse_markdown_row(line)
        if not cells:
            continue
        if is_separator_row(cells):
            continue
        rows.append(cells)

    if not rows:
        raise ValueError(f"No markdown table rows found in {markdown_path}")

    max_cols = max(len(r) for r in rows)
    normalized = [r + [""] * (max_cols - len(r)) for r in rows]

    widths = [0] * max_cols
    for row in normalized:
        for i, cell in enumerate(row):
            widths[i] = max(widths[i], len(cell))

    def format_row(row: list[str]) -> str:
        return "| " + " | ".join(cell.ljust(widths[i]) for i, cell in enumerate(row)) + " |"

    border = "+-" + "-+-".join("-" * w for w in widths) + "-+"

    lines: list[str] = [border, format_row(normalized[0]), border]
    for row in normalized[1:]:
        lines.append(format_row(row))
    lines.append(border)
    return lines


def load_monospace_font(size: int = 16) -> ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/consola.ttf",
        "C:/Windows/Fonts/lucon.ttf",
        "C:/Windows/Fonts/cour.ttf",
    ]
    for font_path in candidates:
        path = Path(font_path)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def render_text_lines_to_image(lines: list[str], output_png: Path) -> Image.Image:
    font = load_monospace_font(16)
    padding = 24
    line_gap = 6

    temp_image = Image.new("RGB", (1, 1), "white")
    draw = ImageDraw.Draw(temp_image)

    max_width = 0
    line_heights: list[int] = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        max_width = max(max_width, width)
        line_heights.append(height)

    total_height = sum(line_heights) + line_gap * (len(lines) - 1)
    image_width = max_width + padding * 2
    image_height = total_height + padding * 2

    image = Image.new("RGB", (image_width, image_height), "white")
    draw = ImageDraw.Draw(image)

    y = padding
    for line, h in zip(lines, line_heights):
        draw.text((padding, y), line, fill="black", font=font)
        y += h + line_gap

    image.save(output_png, format="PNG")
    return image


def save_rgb_image_as_psd(image: Image.Image, output_psd: Path) -> None:
    """Write a minimal PSD file (RGB, 8-bit, no layers, raw compression)."""
    rgb = image.convert("RGB")
    width, height = rgb.size
    data = rgb.tobytes()  # RGBRGB...

    r = data[0::3]
    g = data[1::3]
    b = data[2::3]

    with output_psd.open("wb") as f:
        # File header section
        f.write(b"8BPS")
        f.write(struct.pack(">H", 1))  # Version
        f.write(b"\x00" * 6)  # Reserved
        f.write(struct.pack(">H", 3))  # Channels (R, G, B)
        f.write(struct.pack(">I", height))
        f.write(struct.pack(">I", width))
        f.write(struct.pack(">H", 8))  # Depth: 8 bits per channel
        f.write(struct.pack(">H", 3))  # Color mode: RGB

        # Color mode data section
        f.write(struct.pack(">I", 0))

        # Image resources section
        f.write(struct.pack(">I", 0))

        # Layer and mask information section
        f.write(struct.pack(">I", 0))

        # Image data section
        f.write(struct.pack(">H", 0))  # Compression: Raw
        f.write(r)
        f.write(g)
        f.write(b)


def main() -> None:
    base_dir = Path(__file__).resolve().parent
    markdown_file = base_dir / "ascii.md"
    png_file = base_dir / "ascii.png"
    psd_file = base_dir / "ascii.psd"

    lines = markdown_to_ascii_lines(markdown_file)
    image = render_text_lines_to_image(lines, png_file)
    save_rgb_image_as_psd(image, psd_file)

    print(f"Generated: {png_file}")
    print(f"Generated: {psd_file}")


if __name__ == "__main__":
    main()
