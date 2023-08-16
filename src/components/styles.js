const bookOfStyles = {
    purchase: [
      'flex',
    ],
    actions: ['sm:mt-0', 'sm:text-right', 'w-28'],
    actionButton: [
      'ml-2',
      'text-xl',
      'ps-2',
      'font-medium',
      'underline',
      'text-gray-700',
    ],
    deleteButton: ['hover:text-red-500'],
    editButton: ['hover:text-blue-500'],
    cancelButton: ['hidden',
                   'hover:text-red-500'],
    saveButton: ['hidden',
                'hover:text-blue-500'],
  
    eventWrapper: [
      'event',
      'bg-white',
      'rounded',
      'shadow-md',
      'flex',
      'flex-col',
      'm-6',
      'mt-8',
      'width-500',
    ],
  
    actionsWrapper: ['actions', 'flex', 'items-center', 'px-5',],
  
    quantity: ['actions', 'flex', 'items-center', 'mt-4'],
  
    input: [
      'input',
      'w-16',
      'text-center',
      'border',
      'border-gray-300',
      'rounded',
      'py-2',
      'px-3',
      'text-gray-700',
      'focus:outline-none',
      'focus:shadow-outline',
    ],
  
    quantityActions: ['quantity-actions', 'flex', 'space-x-2', 'ml-6', 'w-fit'],
  
    increaseBtn: [
      'px-3',
      'py-1',
      'rounded',
      'increase',
      'text-white',
      'hover:bg-red-300',
      'focus:outline-none',
      'focus:shadow-outline',
    ],
    decreaseBtn: [
      'decrease',
      'px-3',
      'py-1',
      'rounded',
      'bg-black',
      'text-white',
      'focus:outline-none',
      'focus:shadow-outline',
    ],
    addToCartBtn: [
      'add-to-cart-btn',
      'px-1',
      'py-2',
      'rounded',
      'text-white',
      'font-bold',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'focus:outline-none',
      'focus:shadow-outline',
    ],
    ticket: [
      'text-center',
      'flex-1',
    ],
  };
  
  export function useStyle(type) {
    if (typeof type === 'string') return bookOfStyles[type];
    else {
      const allStyles = type.map((t) => bookOfStyles[t]);
      return allStyles.flat();
    }
  }
  