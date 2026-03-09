# Introducao a Inteligencia Artificial - 2026-03-09

## Criar container do [Docker]() com [n8n](https://hub.docker.com/r/n8nio/n8n)

```bash
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

# n8n integrations

## Databases

PostgreSQL

## Chats

Slack

## APIs

Google Docs

## Agents

Gemini

## n8n workflows

[Recover Shopify abandoned carts with email, SMS, WhatsApp & Facebook retargeting](https://n8n.io/workflows/11805-recover-shopify-abandoned-carts-with-email-sms-whatsapp-and-facebook-retargeting/)

# [groq](https://console.groq.com/home)
