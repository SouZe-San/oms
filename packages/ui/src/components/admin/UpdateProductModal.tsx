type UpdateProductModalProps = {
  handleUpdateConfirm: () => void;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProductModal = ({ handleUpdateConfirm, setShowConfirmModal }: UpdateProductModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 text-center">
        <h2 className="text-xl font-semibold">Confirm Update</h2>
        <p>Are you sure you want to update the product details?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleUpdateConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;