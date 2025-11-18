# Hostinger Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. File Structure
- [x] All HTML files are in root directory
- [x] CSS files are properly organized (root `style.css` + `styles/` folder)
- [x] JavaScript files in `scripts/` folder
- [x] Assets (logo) in `assets/` folder
- [x] API folder created with `send-email.php`

### 2. Code Issues Fixed
- [x] No localhost URLs
- [x] All paths are relative
- [x] Contact form endpoint updated to `/api/send-email.php`
- [x] Footer container div fixed
- [x] All pages have consistent structure

### 3. Files to Upload to Hostinger

```
/public_html/
├── index.html
├── about.html
├── contact.html
├── how-it-works.html
├── industries.html
├── solutions.html
├── why-us.html
├── style.css
├── .htaccess
├── assets/
│   └── logo.svg
├── scripts/
│   └── script.js
├── styles/
│   ├── about.css
│   ├── contact.css
│   ├── how-it-works.css
│   ├── industries.css
│   ├── solutions.css
│   ├── style.css
│   └── why-us.css
└── api/
    └── send-email.php
```

## 📋 Deployment Steps

### Step 1: Upload Files
1. Log into Hostinger File Manager or use FTP
2. Navigate to `public_html` directory
3. Upload all files maintaining the folder structure

### Step 2: Set Permissions
- Set `.htaccess` file permissions to 644
- Set `api/send-email.php` permissions to 644
- Ensure all directories have 755 permissions

### Step 3: Test Contact Form
1. Visit your website: `https://yourdomain.com/contact.html`
2. Fill out and submit the contact form
3. Check if email is received at `business@ralictates.com`

### Step 4: Verify Email Configuration
- Ensure PHP `mail()` function is enabled on Hostinger
- If emails don't work, you may need to configure SMTP in Hostinger
- Alternative: Use Hostinger's email service or third-party service (SendGrid, Mailgun)

## ⚠️ Important Notes

### Contact Form Email
The contact form uses PHP's `mail()` function. If emails don't work:
1. Check Hostinger's PHP mail settings
2. Consider using SMTP instead (requires additional configuration)
3. Alternative: Use a service like Formspree or EmailJS

### Email Alternative (If PHP mail doesn't work)
You can use a third-party service. Update `contact.html` line 117:
```javascript
// Option 1: Formspree (free tier available)
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
});

// Option 2: EmailJS (free tier available)
// Requires EmailJS account setup
```

## 🔍 Post-Deployment Testing

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Hamburger menu works on mobile
- [ ] Careers modal popup works
- [ ] Contact form submits successfully
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All images load correctly
- [ ] CSS styles apply correctly
- [ ] JavaScript functions work

## 🐛 Common Issues & Solutions

### Issue: CSS not loading
- **Solution**: Check file paths are case-sensitive (Hostinger is case-sensitive)
- Verify `style.css` vs `Style.css`

### Issue: Contact form not working
- **Solution**: 
  1. Check PHP is enabled
  2. Verify `api/send-email.php` permissions
  3. Check Hostinger email settings
  4. Consider using Formspree or EmailJS as alternative

### Issue: 404 errors on pages
- **Solution**: Ensure all HTML files are in root `public_html` directory

### Issue: Images not showing
- **Solution**: Verify `assets/logo.svg` path is correct

## 📞 Support
If you encounter issues:
1. Check Hostinger error logs
2. Enable browser developer tools (F12) to see console errors
3. Verify all file paths are correct
4. Test with a simple HTML file first

---

**Status**: ✅ Ready for Deployment
**Last Updated**: 2025

