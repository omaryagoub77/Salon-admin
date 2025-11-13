import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Upload, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CreditCard,
  Bell,
  Palette
} from 'lucide-react';

const Settings = () => {
  const [salonInfo, setSalonInfo] = useState({
    name: 'Elite Hair Salon',
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    email: 'info@elitehairsalon.com',
    phone: '(555) 123-4567',
    address: '123 Beauty Street, New York, NY 10001',
    hours: 'Mon-Fri: 9:00 AM - 8:00 PM\nSat: 8:00 AM - 6:00 PM\nSun: 10:00 AM - 4:00 PM',
    paymentMethods: ['Cash', 'Credit Card', 'PayPal']
  });

  const [features, setFeatures] = useState({
    booking: true,
    shop: true,
    gallery: true,
    reviews: true
  });

  const [emailTemplates, setEmailTemplates] = useState({
    bookingConfirmation: 'Dear {name},\n\nThank you for booking an appointment with us. Your appointment for {service} with {stylist} is scheduled for {date} at {time}.\n\nWe look forward to seeing you!\n\nBest regards,\n{salonName} Team',
    bookingReminder: 'Dear {name},\n\nThis is a reminder for your appointment with us. Your appointment for {service} with {stylist} is scheduled for tomorrow at {time}.\n\nPlease arrive 10 minutes early.\n\nBest regards,\n{salonName} Team'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleInfoChange = (field, value) => {
    setSalonInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFeature = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleTemplateChange = (template, value) => {
    setEmailTemplates(prev => ({
      ...prev,
      [template]: value
    }));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Settings
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Manage your salon settings and preferences
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Salon Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Salon Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salon Name</label>
                <input
                  type="text"
                  value={salonInfo.name}
                  onChange={(e) => handleInfoChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={salonInfo.logo} 
                    alt="Salon Logo" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={salonInfo.logo}
                      onChange={(e) => handleInfoChange('logo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                    <p className="text-sm text-gray-500 mt-1">Enter image URL or upload new logo</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={salonInfo.email}
                      onChange={(e) => handleInfoChange('email', e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={salonInfo.phone}
                      onChange={(e) => handleInfoChange('phone', e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={salonInfo.address}
                    onChange={(e) => handleInfoChange('address', e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    value={salonInfo.hours}
                    onChange={(e) => handleInfoChange('hours', e.target.value)}
                    rows={4}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Email Templates */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Email Templates</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Confirmation</label>
                <textarea
                  value={emailTemplates.bookingConfirmation}
                  onChange={(e) => handleTemplateChange('bookingConfirmation', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Reminder</label>
                <textarea
                  value={emailTemplates.bookingReminder}
                  onChange={(e) => handleTemplateChange('bookingReminder', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Features</h2>
            <div className="space-y-4">
              {Object.entries(features).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                      {key === 'booking' && <Clock className="w-5 h-5 text-gold" />}
                      {key === 'shop' && <CreditCard className="w-5 h-5 text-gold" />}
                      {key === 'gallery' && <Palette className="w-5 h-5 text-gold" />}
                      {key === 'reviews' && <Bell className="w-5 h-5 text-gold" />}
                    </div>
                    <span className="font-medium text-gray-800 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => toggleFeature(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</label>
                <div className="space-y-2">
                  {['Cash', 'Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        id={method}
                        checked={salonInfo.paymentMethods.includes(method)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInfoChange('paymentMethods', [...salonInfo.paymentMethods, method]);
                          } else {
                            handleInfoChange('paymentMethods', salonInfo.paymentMethods.filter(m => m !== method));
                          }
                        }}
                        className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold"
                      />
                      <label htmlFor={method} className="ml-2 text-sm text-gray-700">{method}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;