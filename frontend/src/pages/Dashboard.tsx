import React, { useState } from "react";
import FileUpload from "../components/FileUpload/FileUpload";
import Spinner from "../components/Spinner/Spinner";
import Words from "../components/Words/Words";
import axios_instance from "../config";
interface Response {
  count: number;
  tags: any;
}
const Dashboard: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Response>();
  const handleTextUpdate = (txt: string) => {
    setText(txt);
    setError("");
    axios_instance
      .post(`/`, txt, {
        headers: {
          "Content-type": "text/plain",
        },
      })
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setResponse(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) =>
        setError("something went wrong....internal server error")
      );
  };
  return (
    <>
      <div className="row w-100 flex-column gap-2 align-items-center">
        <FileUpload
          handleTextUpdate={handleTextUpdate}
          setLoading={setLoading}
        />
        <div className="col-md-5">
          {loading ? (
            <Spinner status="Please wait... Reading and analysing the text file.." />
          ) : text ? (
            <>
              <textarea
                style={{ height: "400px", resize: "none" }}
                spellCheck={false}
                value={text}
                readOnly
                className="form-control txt-area text-muted"
              ></textarea>
              <Words
                count={response?.count as number}
                length={response?.tags.adjectives.length}
                title="adjectives"
              />
              <Words
                count={response?.count as number}
                length={response?.tags.verbs.length}
                title="verbs"
              />
              <Words
                count={response?.count as number}
                length={response?.tags.adverbs.length}
                title="adverbs"
              />
              <Words
                count={response?.count as number}
                length={response?.tags.nouns.length}
                title="nouns"
              />
            </>
          ) : (
            ""
          )}
        </div>
        {error ? <p className="text-danger text-center">{error}</p> : ""}
      </div>
    </>
  );
};

export default Dashboard;
