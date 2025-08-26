# 🔧 Troubleshooting Guide

## 🚨 "It is not loading" - Common Solutions

### 1. **Check Development Server**
```bash
# Make sure the server is running
cd /home/lenovo/Changa_DAO/src/Changa_DAO_frontend
npm run dev

# You should see:
# VITE v5.4.19  ready in XXXX ms
# ➜  Local:   http://localhost:517X/
```

### 2. **Check Browser Console**
- **Open Developer Tools** (F12)
- **Check Console tab** for errors
- **Check Network tab** for failed requests

### 3. **Clear Browser Cache**
- **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- **Clear cache**: Ctrl+Shift+Delete
- **Try incognito/private mode**

### 4. **Check Port Conflicts**
```bash
# If port is in use, try:
lsof -ti:5173 | xargs kill -9
lsof -ti:5174 | xargs kill -9
lsof -ti:5175 | xargs kill -9
lsof -ti:5176 | xargs kill -9
```

### 5. **Restart Development Server**
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### 6. **Check File Permissions**
```bash
# Make sure you have read permissions
ls -la /home/lenovo/Changa_DAO/src/Changa_DAO_frontend/
```

### 7. **Verify Dependencies**
```bash
# Reinstall dependencies if needed
rm -rf node_modules package-lock.json
npm install
```

## 🎯 **Performance Optimizations Applied**

### ✅ **Code Splitting**
- **Lazy loading** for all pages
- **Smaller initial bundle** (692KB vs 955KB)
- **Faster page loads**

### ✅ **Loading States**
- **Suspense boundaries** with spinners
- **Better user experience**
- **No more blank screens**

### ✅ **Image Optimization**
- **Lazy loading** for team images
- **Loading states** for avatars
- **Smooth transitions**

## 📊 **Expected Performance**

- **30-50% faster** initial loads
- **Smooth page transitions**
- **Better mobile experience**
- **Reduced server load**

## 🆘 **Still Not Working?**

If the app still doesn't load:

1. **Check the terminal output** for any error messages
2. **Try a different browser**
3. **Check if the port is accessible** (try `curl http://localhost:5176`)
4. **Restart your computer** if all else fails

## 📞 **Quick Commands**

```bash
# Build the app
npm run build

# Start dev server
npm run dev

# Check for errors
npm run lint

# Clear cache and restart
rm -rf node_modules && npm install && npm run dev
```
