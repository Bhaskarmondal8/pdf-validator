# Easy Signature Verifier

A privacy-conscious web app for validating digitally signed PDF documents.

## What it does

1. User selects a PDF in the browser.
2. The PDF is sent over HTTPS to `/api/verify`.
3. The server validates embedded PDF signatures using pyHanko.
4. The response reports:
   - cryptographic signature validity
   - signer certificate information
   - trust status
   - document integrity
5. The server never writes uploaded PDFs to disk in this app.

### Important

This app **does not modify a signed PDF** to paint a green tick inside Adobe Acrobat.
Adobe's green/unknown status is viewer trust state. Re-saving or altering a signed PDF can invalidate the signature.

This app also **does not silently install certificates or licenses on a user's phone/computer**.
Browsers intentionally block silent installation of OS/application trust stores.

For Aadhaar, only mark an issuer as trusted after loading the exact official trust anchor/certificate chain approved for the intended validation workflow. Do not ship an unverified certificate just to make the UI green.

## Run locally

Python 3.11+ recommended.

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000

## Production

Recommended simple architecture:
- Frontend: static hosting/CDN
- API: small HTTPS Python service
- Custom domain: strongly recommended
- Do not store uploaded PDFs
- Add rate limiting before publishing

See `DEPLOY.md`.
