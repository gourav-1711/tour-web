import { MessageCircle, Phone } from "lucide-react";

export function Footer() {

  return (
    <footer className="bg-gray-800 text-white py-12">
      {/* Footer */}

      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Customer Support</h3>
        <p className="mb-2">
          If You Need Any Help You Can Contact Us 24X7 For Any Support
        </p>
        <p className="mb-6">Call 7568333373</p>
        <p className="mb-8">JODHPUR</p>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex items-center space-x-2">
            <Phone size={20} />
            <div>
              <p className="font-semibold">Call</p>
              <p>7568333373</p>
              <p>JODHPUR</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MessageCircle size={20} />
            <div>
              <p className="font-semibold">Reach us</p>
              <p>Jodhpur, Rajasthan, India</p>
              <p>whatsapp link</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
