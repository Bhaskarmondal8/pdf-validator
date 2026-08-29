# Free/low-cost publishing plan

## Option A — easiest

### Frontend
Deploy the `frontend/` folder to a static host such as GitHub Pages.

### API
Deploy `backend/` to a Python host that supports long-running Flask/Gunicorn services.
Set the frontend `API_URL` to the HTTPS API URL.

### Domain + HTTPS
Use a custom domain. HTTPS is essential because these are sensitive documents.

### Google AdSense
AdSense requires a site Google can review and a policy-compliant public website.
Do not place ads next to misleading “government verification” claims.
Clearly state that the app is an independent utility unless you have official authorization.

## Privacy recommendations

- Never permanently save Aadhaar/PAN/certificate PDFs.
- Keep request logs free of filenames and document contents.
- Set an upload size limit.
- Delete temp data immediately if a future implementation uses temporary files.
- Add a clear privacy policy.
- Add Terms of Use and a disclaimer.
- Do not use uploaded documents for analytics or model training.

## Performance

The frontend is intentionally small.
The API response is JSON only, so after the PDF upload the returned payload is tiny.
For slow connections, show upload progress and avoid downloading a second copy of the PDF.

## Important security boundary

A web page cannot silently install a Windows certificate root, Acrobat trust identity, Android certificate, or native browser extension. That requires a user-authorized OS/app installation flow.
