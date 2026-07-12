# Smart Tools BD - ল্যান্ডিং পেজ কাস্টমাইজেশন গাইড

এই ফাইলটিতে আপনার ল্যান্ডিং পেজের বিভিন্ন গুরুত্বপূর্ণ তথ্য (যেমন: দাম, ফোন নম্বর, হোয়াটসঅ্যাপ, পিক্সেল আইডি এবং রিভিউ) কীভাবে এবং কোথায় পরিবর্তন করবেন তার সহজ নিয়মাবলী দেওয়া হলো।

কোডে যেকোনো পরিবর্তন করার আগে ফাইলটির একটি ব্যাকআপ কপি তৈরি করে নেওয়া নিরাপদ।

---

## ১. মূল্য ও অফার পরিবর্তন (Changing Prices)
ওয়েবসাইটের বিভিন্ন জায়গায় অফার প্রাইস ও রেগুলার প্রাইস দেওয়া আছে। এগুলো পরিবর্তন করতে [index.html](file:///c:/Users/Dremoy/Desktop/F/index.html) ফাইলটি কোড এডিটরে ওপেন করে নিচের অংশগুলো পরিবর্তন করুন:

* **হিরো সেকশনে (১১৭ নম্বর লাইন):**
  ```html
  <!-- EDIT PRICE HERE --> ৳ ১,৪৫০
  ```
  এখানে আপনার নতুন অফার দামটি লিখুন।
  
* **প্রাইসিং কার্ডে (১২০১ এবং ১২০৫ নম্বর লাইন):**
  ```html
  <span class="regular-price text-decoration-line-through">৳ ১,৮০০</span>
  <span class="offer-price text-gradient font-bold block">৳ ১,৪৫০</span>
  ```
  এখানে `৳ ১,৮০০` (নিয়মিত দাম) এবং `৳ ১,৪৫০` (অফার দাম) পরিবর্তন করুন।

* **অর্ডার ড্রপডাউন অপশনে (১২২৬ নম্বর লাইন থেকে):**
  ```html
  <option value="1 Pcs - ৳ 1,450" selected>১ পিস - ৳ ১,৪৫০ (ফ্রি ডেলিভারি)</option>
  ```
  Here `value` and standard text price can be changed according to your requirements.

---

## ২. হোয়াটসঅ্যাপ ও মোবাইল নম্বর আপডেট (Updating Phone & WhatsApp)
কাস্টমার যাতে আপনার নম্বরে যোগাযোগ করতে পারে, সেজন্য নিচের লিংকের নম্বরগুলো পরিবর্তন করুন:

* **হোয়াটসঅ্যাপ নম্বর পরিবর্তন:**
  `index.html` ফাইলে মোট ৩টি জায়গায় হোয়াটসঅ্যাপ লিংক আছে (লাইন ১০০, ১২১৫ এবং ১৩০৩)।
  ```html
  href="https://wa.me/8801711400147"
  ```
  এখানে `8801711400147`-এর জায়গায় আপনার কান্ট্রি কোড সহ (যেমন `880`) হোয়াটসঅ্যাপ নম্বরটি বসান।

* **কল করার ফোন নম্বর পরিবর্তন:**
  `index.html` ফাইলে মোট ২টি জায়গায় সরাসরি কল করার লিংক আছে (লাইন ১২২৭ এবং ১৩২১)।
  ```html
  href="tel:+8801711400147"
  ```
  এখানে আপনার ফোন নম্বরটি বসান। এছাড়া লাইন ১২৭৬-এ ফুটারে প্রদর্শিত ভিজ্যুয়াল নম্বরটিও টেক্সট আকারে পরিবর্তন করুন।

---

## ৩. ফেসবুক মেসেঞ্জার লিংক বসানো (Updating Messenger Link)
ফেসবুক মেসেঞ্জারে সরাসরি কথা বলার জন্য ৩টি লিংক দেওয়া আছে (লাইন ১১১, ১২২১ এবং ১৩১২):
```html
href="https://m.me/YOURPAGE"
```
এখানে `YOURPAGE` কেটে দিয়ে আপনার ফেসবুক পেজের ইউজারনেম (Username) বসিয়ে দিন। যেমন: `https://m.me/smarttoolsbd`।

---

## ৪. ফেসবুক পিক্সেল কোড যুক্ত করা (Adding Facebook Pixel)
ফেসবুক পেইড ক্যাম্পেইনের জন্য ট্র্যাকিং পিক্সেল যুক্ত করতে:
1. [index.html](file:///c:/Users/Dremoy/Desktop/F/index.html) ফাইলের শুরুর দিকে `<head>` ট্যাগের ভেতরে যান।
2. লাইন ৪১ এর কাস্টম সিএসএস লিংকের ঠিক উপরে আপনার ফেসবুক পিক্সেল কোডটি কপি করে পেস্ট করে দিন:
   ```html
   <!-- Facebook Pixel Code Here -->
   <script>
     // পিক্সেল স্ক্রিপ্ট কোড...
   </script>
   ```

---

## ৫. কাস্টমার রিভিউ ও এফএকিউ এডিট (Reviews & FAQs)
* **রিভিউ এডিট:**
  `index.html` ফাইলের **Section 11 (Customer Reviews)**-এ যান। সেখানে প্রতিটি রিভিউ ব্লকে কাস্টমারের নাম, কমেন্ট ও রেটিং স্টার দেওয়া আছে। আপনি সেগুলো সরাসরি বাংলা টেক্সট পরিবর্তন করে নিজের মতো সাজাতে পারেন।
  
* **FAQ প্রশ্ন-উত্তর এডিট:**
  `index.html` ফাইলের **Section 10 (FAQ Section)**-এ ১০টি প্রশ্ন ও উত্তর দেওয়া আছে। আপনি চাইলে যেকোনো প্রশ্নের টেক্সট সরাসরি বাংলাতে এডিট করতে পারেন।

---

## ৬. গুগল শিট কানেক্ট করা (Google Sheets Connection)
অর্ডার ফর্মের কাস্টমার ডেটা গুগল শিটে সরাসরি পাঠাতে নিচে উল্লিখিত কোডটি গুগল শিটে রান করতে হবে:

### ধাপ ১: গুগল শিটে অ্যাপস স্ক্রিপ্ট কোড বসানো
1. প্রথমে একটি গুগল শিট ওপেন করুন এবং কলামের ১ম লাইনে যথাক্রমে **Timestamp**, **Name**, **Phone**, **Address**, **Quantity**, **Price** লিখে রাখুন।
2. শিটের উপরের মেনুবার থেকে **Extensions ➡️ Apps Script**-এ ক্লিক করুন।
3. কোড এডিটর উইন্ডোর ভেতরের পূর্বের কোড ডিলিট করে নিচের স্ক্রিপ্টটি হুবহু কপি করে পেস্ট করুন:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var name = e.parameter.name || e.parameter.Name || "";
    var phone = e.parameter.phone || e.parameter.Phone || "";
    var address = e.parameter.address || e.parameter.Address || "";
    var quantity = e.parameter.quantity || e.parameter.Quantity || "";
    
    // Quantity থেকে দাম (Price) আলাদা করা (যেমন: "1 Pcs - ৳ 1,450" থেকে "1450" বের করা)
    var price = "";
    if (quantity) {
      var match = quantity.match(/৳\s*([\d,]+)/);
      if (match) {
        price = match[1].replace(/,/g, ''); // "1450"
      }
    }
    
    // শিটে নতুন তথ্য যোগ করা
    sheet.appendRow([new Date(), name, phone, address, quantity, price]);
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Order saved successfully!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### ধাপ ২: ওয়েব অ্যাপ হিসেবে কোডটি পাবলিশ করা
1. অ্যাপস স্ক্রিপ্ট পেজের উপরে ডানে থাকা **Deploy ➡️ New deployment**-এ ক্লিক করুন।
2. গিয়ার আইকনে ক্লিক করে **Web app** সিলেক্ট করুন।
3. নিচের অপশনগুলো সিলেক্ট করুন:
   * **Execute as:** `Me (your-email@gmail.com)`
   * **Who has access:** **`Anyone`** *(অবশ্যই Anyone সিলেক্ট করবেন, অন্যথায় অর্ডার ডেটা শিটে আসবে না)*
4. **Deploy** বাটনে ক্লিক করে সব পারমিশন 'Allow' করে দিন।
5. এরপর আপনি একটি **Web app URL** পাবেন। সেটি কপি করে নিন।

### ধাপ ৩: ল্যান্ডিং পেজের ফাইলে লিংক বসানো
1. আপনার ল্যান্ডিং পেজের [app.js](file:///c:/Users/Dremoy/Desktop/F/app.js) ফাইলটি ওপেন করুন।
2. লাইন ১১০-এর দিকে `GOOGLE_SCRIPT_URL` এর ভেতরে আপনার কপি করা URL-টি পেস্ট করুন:
   ```javascript
   const GOOGLE_SCRIPT_URL = "আপনার_কপি_করা_ওয়েব_অ্যাপ_লিংক_এখানে";
   ```
