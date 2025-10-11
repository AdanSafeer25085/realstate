# 🔧 Troubleshooting Guide

## **Common Issues and Solutions**

### **Issue 1: "Missing Supabase environment variables" Error**

**Symptoms:**
- Forms don't save data
- Edit forms don't load
- Console shows: `Missing Supabase environment variables`

**Solution:**
1. Create `.env.local` file in your project root
2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
3. Restart your development server: `npm run dev`

### **Issue 2: "Table doesn't exist" Errors**

**Symptoms:**
- Database connection works but operations fail
- Errors about missing tables like `property_gallery`, `property_summary`, etc.

**Solution:**
1. Go to your Supabase dashboard
2. Open SQL Editor
3. Copy and paste the content from `COMPLETE_DATABASE_SETUP.sql`
4. Click "Run" to execute

### **Issue 3: "Column doesn't exist" Errors**

**Symptoms:**
- Property creation fails with column errors
- Missing fields like `property_subtitle`, `developer_name`, etc.

**Solution:**
- Run the `COMPLETE_DATABASE_SETUP.sql` script (it adds all missing columns)

### **Issue 4: "Permission denied" Errors**

**Symptoms:**
- Database operations fail with permission errors
- RLS (Row Level Security) blocking operations

**Solution:**
- The `COMPLETE_DATABASE_SETUP.sql` script sets up proper permissions
- Make sure you run the complete script, not just parts of it

### **Issue 5: Properties Save But Don't Show on Frontend**

**Symptoms:**
- Form submission appears successful
- Properties don't appear in property listings
- Edit forms can't find properties

**Possible Causes:**
1. **Database not properly set up** - Run `COMPLETE_DATABASE_SETUP.sql`
2. **Environment variables missing** - Create `.env.local`
3. **API endpoints failing** - Check browser console for errors

**Solution:**
1. Run `node QUICK_TEST.js` to verify everything works
2. Check browser console for JavaScript errors
3. Verify Supabase connection in browser network tab

### **Issue 6: Edit Form Not Loading Data**

**Symptoms:**
- Edit form loads but fields are empty
- Console shows fetch errors

**Solution:**
1. Check if the property ID exists in the database
2. Verify the API endpoint `/api/properties/[id]` is working
3. Check browser network tab for failed requests

## **Step-by-Step Verification**

### **Step 1: Verify Environment Setup**
```bash
node QUICK_TEST.js
```
This should show all green checkmarks.

### **Step 2: Verify Database Setup**
1. Go to Supabase dashboard
2. Check Tables section
3. Verify these tables exist:
   - `properties`
   - `property_gallery`
   - `property_summary`
   - `property_highlights`
   - `property_features`
   - `property_price_list`
   - `property_location_details`
   - `property_developer_info`
   - `property_commitments`

### **Step 3: Test Property Creation**
1. Go to `/admin/properties/new`
2. Fill out the form completely
3. Submit the form
4. Check if you're redirected to dashboard
5. Check if property appears in property listings

### **Step 4: Test Property Editing**
1. Go to `/admin/dashboard`
2. Click "Edit" on any property
3. Verify all fields are populated
4. Make a change and save
5. Verify the change is saved

## **Getting Help**

If you're still having issues:

1. **Run the quick test**: `node QUICK_TEST.js`
2. **Check the console**: Look for error messages in browser console
3. **Check network tab**: Look for failed API requests
4. **Share the error**: Copy the exact error message you see

## **Common Error Messages and Solutions**

| Error Message | Solution |
|---------------|----------|
| `Missing Supabase environment variables` | Create `.env.local` file |
| `relation "properties" does not exist` | Run `COMPLETE_DATABASE_SETUP.sql` |
| `column "property_subtitle" does not exist` | Run `COMPLETE_DATABASE_SETUP.sql` |
| `permission denied for table properties` | Run `COMPLETE_DATABASE_SETUP.sql` |
| `Failed to fetch` | Check Supabase URL and key |
| `Network error` | Check internet connection and Supabase status |

## **Success Indicators**

You'll know everything is working when:
- ✅ `node QUICK_TEST.js` shows all green checkmarks
- ✅ You can create new properties through the admin form
- ✅ Properties appear on the frontend
- ✅ Edit forms load with existing data
- ✅ All form fields save properly
- ✅ No errors in browser console
