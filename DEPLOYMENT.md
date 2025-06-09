# 🚀 EcoCity Token Dashboard - Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ETHcali/Ecocities)

### Option 2: Manual Deployment

1. **Fork/Clone the Repository**
   ```bash
   git clone https://github.com/ETHcali/Ecocities.git
   cd Ecocities
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## Custom Domain Setup (tokendashboard.ethcali.org)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Domains"
   - Add `tokendashboard.ethcali.org`

2. **Configure DNS Records:**
   ```
   Type: CNAME
   Name: tokendashboard
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

## Environment Variables

Set these in Vercel's dashboard under "Environment Variables":

```env
# Required
VITE_ETHERSCAN_API_KEY=4EEA4YTQFVXZMRE91SBCA7234EBVW733DT

# Optional
VITE_BACKEND_URL=https://api.tokendashboard.ethcali.org
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## Build Configuration

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

## Performance Optimizations

✅ **Implemented:**
- Terser minification
- Code splitting (vendor, charts, utils)
- Asset optimization
- Gzip compression
- CDN caching headers

✅ **SEO Optimized:**
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap ready
- Social media cards

✅ **Progressive Web App:**
- Web app manifest
- Service worker ready
- Mobile responsive
- Offline capability

## Monitoring & Analytics

### Vercel Analytics
Enable in Vercel dashboard:
- Real-time analytics
- Performance monitoring
- Error tracking

### Google Analytics (Optional)
Add `VITE_GOOGLE_ANALYTICS_ID` environment variable

## Security Headers

Configured in `vercel.json`:
- CORS headers
- Security headers
- Cache control

## Custom API Routes

If you need backend functionality:
```
/api/* → Proxy to backend server
```

## Development Workflow

1. **Local Development:**
   ```bash
   npm run dev
   ```

2. **Production Build:**
   ```bash
   npm run build:prod
   ```

3. **Preview Build:**
   ```bash
   npm run preview
   ```

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Environment variables configured
- [ ] Custom domain configured
- [ ] SSL certificate enabled (automatic)
- [ ] Performance optimizations verified
- [ ] SEO tags validated
- [ ] Mobile responsiveness tested
- [ ] Analytics configured

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm ci
npm run build
```

### Domain Issues
- Verify DNS propagation: `dig tokendashboard.ethcali.org`
- Check Vercel domain configuration
- Wait for DNS propagation (up to 24h)

### Performance Issues
- Check Vercel function logs
- Monitor Core Web Vitals
- Optimize images and assets

## Support

- **Documentation**: [GitHub Repository](https://github.com/ETHcali/Ecocities)
- **Issues**: [GitHub Issues](https://github.com/ETHcali/Ecocities/issues)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

**🌱 Ready to transform cities through community-driven waste recovery!** 