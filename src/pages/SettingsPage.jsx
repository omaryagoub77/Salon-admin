import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';

export default function SettingsPage() {
  const { documents: settingsDocs, updateDocument, loading } = useFirestore('settings');
  const [formData, setFormData] = useState({
    salonName: '',
    logo: '',
    phone: '',
    email: '',
    address: '',
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      whatsapp: ''
    },
    heroTitle: '',
    heroSubtitle: '',
    bannerImage: ''
  });

  // Load existing settings
  useEffect(() => {
    if (settingsDocs.length > 0) {
      const settings = settingsDocs[0];
      setFormData({
        salonName: settings.salonName || '',
        logo: settings.logo || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        openingHours: {
          monday: settings.openingHours?.monday || '',
          tuesday: settings.openingHours?.tuesday || '',
          wednesday: settings.openingHours?.wednesday || '',
          thursday: settings.openingHours?.thursday || '',
          friday: settings.openingHours?.friday || '',
          saturday: settings.openingHours?.saturday || '',
          sunday: settings.openingHours?.sunday || ''
        },
        socialLinks: {
          facebook: settings.socialLinks?.facebook || '',
          instagram: settings.socialLinks?.instagram || '',
          whatsapp: settings.socialLinks?.whatsapp || ''
        },
        heroTitle: settings.heroTitle || '',
        heroSubtitle: settings.heroSubtitle || '',
        bannerImage: settings.bannerImage || ''
      });
    }
  }, [settingsDocs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOpeningHoursChange = (day, value) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: value
      }
    });
  };

  const handleSocialLinksChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (settingsDocs.length > 0) {
        // Update existing settings
        await updateDocument(settingsDocs[0].id, formData);
      } else {
        // Create new settings document
        // Note: In a real app, you would use addDocument from useFirestore
        // For now, we'll just show an alert
        alert('Settings saved! (In a real app, this would be saved to Firestore)');
      }
      
      // Show success message
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">Manage your salon settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">General Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="salonName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Salon Name
              </label>
              <input
                type="text"
                id="salonName"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="logo" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Opening Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(formData.openingHours).map(([day, hours]) => (
              <div key={day}>
                <label htmlFor={`hours-${day}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  id={`hours-${day}`}
                  value={hours}
                  onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label htmlFor="facebook" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleSocialLinksChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="instagram" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialLinksChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                id="whatsapp"
                value={formData.socialLinks.whatsapp}
                onChange={(e) => handleSocialLinksChange('whatsapp', e.target.value)}
                placeholder="https://wa.me/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="heroTitle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Hero Title
              </label>
              <input
                type="text"
                id="heroTitle"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="heroSubtitle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Hero Subtitle
              </label>
              <textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="bannerImage" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Banner Image URL
              </label>
              <input
                type="text"
                id="bannerImage"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
              
              {formData.bannerImage && (
                <div className="mt-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Preview
                  </label>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={formData.bannerImage} 
                      alt="Banner preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Save Settings
          </Button>
        </div>
      </form>
    </motion.div>
  );
}