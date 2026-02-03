# Deployment

This guide explains how to deploy changes to The Bakery website.

---

## Hosting

The website is hosted on **GitHub Pages**.

- **Repository**: <https://github.com/TheOfficialBakery/the-bakery-website>
- **Live URL**: <https://theofficialbakery.github.io/the-bakery-website/>

---

## Security Headers

To ensure full security protection (including `frame-ancestors` for clickjacking protection), the website must be hosted on a platform that supports custom HTTP headers, such as **Netlify** or **Cloudflare Pages**.

- The repository includes a `_headers` file (standard format) and `netlify.toml` (Netlify specific) to configure these headers automatically.
- **GitHub Pages** does not support custom headers, so while the site will function, it will not have the full security posture defined in these files.

---

## Deployment Process

GitHub Pages automatically deploys when you push to the `master` branch.

### Step 1: Make Changes

Edit files locally and test with:

```bash
npx serve .
```

Open <http://localhost:3000> to preview.

### Step 2: Commit Changes

```bash
git add .
git commit -m "Brief description of changes"
```

### Step 3: Push to GitHub

```bash
git push
```

### Step 4: Wait for Deployment

- Deployment takes 1-2 minutes
- Check status at: <https://github.com/TheOfficialBakery/the-bakery-website/actions>

---

## Troubleshooting Deployment

### Build Fails with Jekyll Error

The `.nojekyll` file should prevent this. If issues persist:

1. Ensure `.nojekyll` exists in root directory
2. Check the Actions tab for error details
3. The file can be empty but must exist

### Changes Not Appearing

1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Wait a few more minutes
4. Check GitHub Actions for deployment status

### Push Rejected

If `git push` fails:

```bash
git pull --rebase
git push
```

---

## Custom Domain (Optional)

To use a custom domain:

### Step 1: Add CNAME file

Create a file named `CNAME` (no extension) in root:

```
yourdomain.com
```

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | theofficialbakery.github.io |

### Step 3: Enable HTTPS

In GitHub repository settings:

1. Go to Settings > Pages
2. Check "Enforce HTTPS"

---

## Local Development

### Prerequisites

- Git installed
- Node.js installed (for `npx serve`)
- Text editor (VS Code recommended)

### Setup

```bash
# Clone repository
git clone https://github.com/TheOfficialBakery/the-bakery-website.git
cd the-bakery-website

# Start local server
npx serve .
```

### Testing Responsive Design

1. Open Chrome DevTools (F12)
2. Click the device toggle button (or Ctrl+Shift+M)
3. Select different device presets or set custom dimensions

### Testing on Mobile

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start server: `npx serve . --listen 0.0.0.0:3000`
3. On mobile, navigate to `http://[your-ip]:3000`

---

## Rollback

If a deployment causes issues:

### Revert Last Commit

```bash
git revert HEAD
git push
```

### Revert to Specific Commit

```bash
# Find the commit hash
git log --oneline

# Revert to that commit
git revert [commit-hash]
git push
```

---

## Environment

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | theofficialbakery.github.io/the-bakery-website | master |
| Local Dev | localhost:3000 | any |

---

## Monitoring

### Check Site Status

- Visit the live URL
- Use <https://downforeveryoneorjustme.com/>

### Analytics (Future)

Consider adding:

- Google Analytics
- Plausible Analytics (privacy-friendly)
- Simple Analytics

Add tracking code just before `</head>` tag.
