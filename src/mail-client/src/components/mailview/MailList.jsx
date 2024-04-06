import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

import { authState } from "../../state/auth";
import { baseAPI } from "../../../constants";

const MailList = () => {
  const [mails, setMails] = useState([]);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const fetchMails = async () => {
      const { data } = await axios.get(`${baseAPI}/api/v1/mails`, {
        headers: {
          Authorization: auth.token,
        },
      });
      const { mails } = data.data;
      setMails(mails);
    };
    fetchMails();
  }, []);

  return (
    <div className="h-full flex flex-col p-4">
      <nav className="w-full bg-slate-200 p-4 rounded-md"></nav>
      <div className="mt-4 rounded-md">
        {mails.map((mail) => {
          return (
            <div
              className="w-full bg-slate-200 p-4 rounded-t-lg"
              key={mail._id}
            >
              {/* name email */}
              <div>
                <div>{mail.from.value[0].name || "<N/A>"}</div>
                <div>{mail.from.value[0].address}</div>
              </div>
              {/* subject content */}
              <div>
                <div>{mail.subject}</div>
                <div>{mail.textAsHtml}</div>
              </div>
              {/* date time */}
              <div>
                <div>
                  {
                    new Date(Date.parse(mail.date))
                      .toLocaleString()
                      .split(", ")[0]
                  }
                </div>
                <div>
                  {
                    new Date(Date.parse(mail.date))
                      .toLocaleString()
                      .split(", ")[1]
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MailList;
