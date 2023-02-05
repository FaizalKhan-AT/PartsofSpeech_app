import { FC, FormEvent, useRef, useState } from "react";
interface Props {
  handleTextUpdate: (txt: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const FileUpload: FC<Props> = ({ handleTextUpdate, setLoading }) => {
  const upRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const handleUpload = () => {
    upRef.current?.click();
  };
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const [file] = target.files as FileList;
    if (!file) {
      setError("No txt file is uploaded! please upload one..");
      return;
    }
    setLoading(true);

    let fileReader = new FileReader();
    fileReader.addEventListener("load", () =>
      handleTextUpdate(fileReader.result as string)
    );
    fileReader.readAsText(file);
    target.value = "";
  };
  return (
    <div
      style={{ borderRadius: "8px", border: "1px dashed green" }}
      className="col-md-4 p-2 my-4 py-4"
    >
      <input
        onChange={handleChange}
        type="file"
        hidden
        ref={upRef}
        accept=".txt"
      />
      <div className="d-flex flex-column align-items-center gap-3">
        <span
          style={{
            fontSize: "7em",
            border: "1px dashed gray",
            borderRadius: "50%",
          }}
          className="material-symbols-outlined p-4"
        >
          upload_file
        </span>
        <button onClick={handleUpload} className="btn btn-primary btn-lg mt-3">
          upload .txt file{" "}
        </button>
        <span className="my-3 text-danger">{error ? error : ""}</span>
      </div>
    </div>
  );
};
export default FileUpload;
