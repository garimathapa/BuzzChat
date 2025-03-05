const FileUploadModal = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="modal">
        <div className="modal__content">
          <h3>Upload File</h3>
          <input type="file" />
          <button className="modal__button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default FileUploadModal;
  