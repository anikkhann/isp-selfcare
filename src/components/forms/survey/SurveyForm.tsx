/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState
} from "react";
// import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, Button, Form, Row, Col, Radio } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

export interface TroubleshootData {
  createdOn: number;
  id: string;
  type: string;
  title: string;
  options: string;
  isActive: boolean;
}

export interface ConvertTroubleshootData {
  createdOn: number;
  id: string;
  type: string;
  title: string;
  options: any[];
  isActive: boolean;
}

interface SurveyReportData {
  question: string;
  answer: string;
}

const SurveyForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [surveyData, setSurveyData] = useState<any[]>([]);

  const [surveyReport, setSurveyReport] = useState<SurveyReportData[]>([]);

  // const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  function getData() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        type: "Survey",
        isActive: true
      }
    };

    axios.post("/api/troubleshoot-survey/get-list", body).then(res => {
      const { data } = res;
      // console.log(data.body);
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const newData = data.body.map((item: TroubleshootData) => {
        // convert options to array
        // remove
        const options = item.options
          .slice(1, -1) // Remove the curly braces
          .split(",")
          .map(option => option.replace(/'/g, "").trim());

        return {
          ...item,
          options: options
        };
      });

      const newReportData = newData.map((item: ConvertTroubleshootData) => {
        return {
          question: item.title,
          answer: ""
        };
      });

      setSurveyReport(newReportData);

      setSurveyData(newData);
    });
  }

  useEffect(() => {
    getData();

    return () => {
      setSurveyData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("surveyReport", JSON.stringify(surveyReport));

    try {
      axios
        .post("/api/survey-report/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          const { data } = res;

          if (data.status != 200) {
            setShowError(true);
            setErrorMessages(data.message);
            MySwal.fire({
              title: "Error",
              text: data.message || "Something went wrong",
              icon: "error"
            });
          }

          if (data.status == 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Updated successfully",
              icon: "success"
            }).then(() => {
              form.resetFields();
            });
          }
        })
        .catch(err => {
          // console.log(err);
          MySwal.fire({
            title: "Error",
            text: err.response.data.message || "Something went wrong",
            icon: "error"
          });
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <AppImageLoader />}

      {showError && <Alert message={errorMessages} type="error" showIcon />}

      {!loading && (
        <div className="mt-8 mx-5">
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              amount: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row
              gutter={[16, 16]}
              justify={"center"}
              style={{
                border: "1px solid #e8e8e8",
                padding: "16px",
                borderRadius: "2px",
                backgroundColor: "#fafafa"
              }}
            >
              {surveyData.map((survey, index) => (
                <Col
                  key={survey.id}
                  span={24}
                  style={{
                    border: "1px solid #e8e8e8",
                    padding: "16px",
                    borderRadius: "2px",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <Form.Item
                    label={survey.title}
                    name={`options-${index}`}
                    rules={[
                      { required: true, message: "Please select an option" }
                    ]}
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold",
                      width: "100%",
                      textAlign: "left"
                    }}
                  >
                    <Radio.Group
                      onChange={e => {
                        const newSurveyReport = [...surveyReport];
                        newSurveyReport[index].answer = e.target.value;
                        setSurveyReport(newSurveyReport);
                      }}
                    >
                      {survey.options.map(
                        (
                          option:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined,
                          optionIndex: Key | null | undefined
                        ) => (
                          <Radio key={optionIndex} value={option}>
                            {option}
                          </Radio>
                        )
                      )}
                    </Radio.Group>
                  </Form.Item>
                </Col>
              ))}
            </Row>
            <Form.Item
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default SurveyForm;
