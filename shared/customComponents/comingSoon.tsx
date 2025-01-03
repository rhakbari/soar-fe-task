import React from 'react';
import { AlertCircle, Construction } from 'lucide-react';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <Construction className="w-16 h-16 text-grey-600 mx-auto mb-4" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              This Feature Is Coming Soon
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We're working on building this section of the application. Check back soon for updates on new features and improvements.
            </p>

            <div className="inline-flex items-center justify-center gap-2 bg-grey-600 text-white px-4 py-2 rounded-md hover:bg-grey-700 transition-colors">
              <span>Return to Dashboard</span>
            </div>
          </div>

          {/* Status Card */}
          <div className="mt-6 bg-grey-50 border border-grey-100 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="text-grey-600 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-medium text-grey-800 mb-1">
                Development in Progress
              </h3>
              <p className="text-sm text-grey-600">
                This section is currently under active development. We'll notify you when it becomes available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;