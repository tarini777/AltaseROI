# ⚡ Quick Deploy - ATLASE ROI Tool

## 🚀 Deploy in 3 Steps

### 1. Push to Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
```bash
# Option A: Automated script
./deploy.sh

# Option B: Manual CLI
npm install -g vercel
vercel login
vercel --prod
```

### 3. Update CORS (After deployment)
Edit `server/index.js` and replace:
```javascript
['https://your-actual-domain.vercel.app']
```
with your actual Vercel domain.

## 📋 Files Ready
- ✅ `vercel.json` - Deployment config
- ✅ `.vercelignore` - Exclude files
- ✅ `deploy.sh` - Auto-deploy script
- ✅ Server CORS configured
- ✅ Client build tested

## 🌐 Your App Will Be At
`https://your-app-name.vercel.app`

## 📞 Need Help?
- See `VERCEL_DEPLOYMENT.md` for detailed guide
- Check `DEPLOYMENT_READY.md` for status
- Vercel docs: vercel.com/docs

**Ready to deploy! 🎯** 