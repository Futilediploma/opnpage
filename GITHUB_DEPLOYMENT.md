# opnpage.me

This is the source code for the opnpage.me dashboard app.

## Setup

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in any required environment variables
4. Run `npm run dev` for local development
5. Run `npm run build` for production

## Deployment

- Static files are built to the `dist` folder
- Use Nginx, Apache, or Caddy to serve the files
- Point your domain (opnpage.me) to your server and use Cloudflare for DNS/CDN/SSL

## Security

- Do not commit secrets or API keys to the repo
- Use environment variables for sensitive config

## Contributing

- Fork the repo and submit pull requests
- Open issues for bugs or feature requests

## License

© 2025 opnpage. All rights reserved.
