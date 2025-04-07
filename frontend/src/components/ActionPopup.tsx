import { useState } from 'react';

interface ActionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActionPopup({ isOpen, onClose }: ActionPopupProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    {
      title: 'Vendre',
      description: 'Vendez votre bien immobilier avec notre expertise',
      icon: '🏠',
    },
    {
      title: 'Louer',
      description: 'Mettez votre bien en location, louer un bien immobilier en toute sérénité',
      icon: '🔑',
    },
    {
      title: 'Acheter',
      description: 'Trouvez le bien de vos rêves',
      icon: '💰',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Que souhaitez-vous faire ?</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => setSelectedAction(action.title)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAction === action.title
                  ? 'border-[#800000] border-[1px] border-solid bg-red-50'
                  : 'border-gray-200 border-[1px] border-solid hover:border-[#9B1B30]'
              }`}
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </button>
          ))}
        </div>

        {selectedAction && (
          <div className="mt-6">
            <button
              onClick={() => {
                // Ici, vous pouvez rediriger vers le formulaire approprié
                console.log(`Action sélectionnée : ${selectedAction}`);
                onClose();
              }}
              className="w-full bg-[#800000] text-white py-3 rounded-lg font-semibold hover:bg-[#9B1B30] transition-colors"
            >
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 