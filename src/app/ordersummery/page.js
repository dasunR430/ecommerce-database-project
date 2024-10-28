import { Check, Truck, MapPin, CreditCard, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/router';
export default function OrderSummary({ id, isClicked, setIsClicked, combinedData }) {
  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Order Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Shipping Information */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">{combinedData.CustomerName}</p>
              <p className="text-gray-600 mt-1">{combinedData.AddressLine1}</p>
              <p className="text-gray-600">{combinedData.AddressLine2}</p>
              <p className="text-gray-600">
                {combinedData.City}, {combinedData.District} {combinedData.PostalCode}
              </p>
              <p className="text-gray-600 mt-1">
                Phone: {formatPhoneNumber(combinedData.PhoneNumber)}
              </p>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">Delivery Method</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">{combinedData.deliverymethod}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">Payment Method</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">{combinedData.paymentmethod}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={() => {setIsClicked(!isClicked); window.location.href = `/`}}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Check className="w-4 h-4" />
              Confirm Order
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}