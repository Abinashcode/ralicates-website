# Contact Page Verification Checklist

## ✅ Files Required in Hostinger Root:

1. **contact.html** - Main contact page
2. **contact.css** - Contact page styles
3. **style.css** - Main stylesheet (required for contact.css to work)
4. **script.js** - JavaScript for hamburger menu and careers modal
5. **assets/logo.svg** - Logo image

## ✅ Paths in contact.html (VERIFIED):

- ✅ CSS: `href="style.css"` (root)
- ✅ CSS: `href="contact.css"` (root)
- ✅ JS: `src="script.js"` (root)
- ✅ Logo: `src="assets/logo.svg"` (correct)

## ✅ Contact Page Features:

1. **Header/Navigation** - Should display correctly
2. **Contact Info Box** - Email and Mobile number
3. **Contact Form** - Name, Email, Subject, Message fields
4. **Footer** - Company info and links
5. **Careers Modal** - Should work when clicking Careers link
6. **Mobile Menu** - Hamburger icon should work on mobile

## 🔍 Things to Check on Live Site:

1. **CSS Loading:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Check if `style.css` and `contact.css` load (Status 200)

2. **JavaScript Loading:**
   - Check if `script.js` loads (Status 200)
   - Check Console for any errors

3. **Visual Check:**
   - Contact form should be centered
   - Email and Mobile should be in a blue info box
   - Form fields should be styled properly
   - Submit button should be blue

4. **Functionality:**
   - Hamburger menu works on mobile
   - Careers link shows modal (not 404)
   - Form validation works (try submitting empty form)

## 🐛 Common Issues:

**If styles not loading:**
- Check file paths are correct (no `styles/` folder)
- Clear browser cache (Ctrl+Shift+R)
- Check file permissions on Hostinger

**If JavaScript not working:**
- Check `script.js` is in root (not `scripts/` folder)
- Check browser console for errors
- Verify script loads in Network tab

**If form not submitting:**
- This is expected - backend endpoint `/api/send-email` needs to be configured
- Form will show error message (this is normal without backend)

---

**Status:** ✅ All files and paths are correct
**Ready for:** Production deployment

