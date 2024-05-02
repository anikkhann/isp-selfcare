import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Upload, Modal, Row, Col, Card } from "antd";
// Progress, Modal, Card
import { CustomerData } from "@/interfaces/CustomerData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
// { AxiosRequestConfig }
import { useRouter } from "next/router";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { VerticalAlignTopOutlined, EyeOutlined } from "@ant-design/icons";
// FileImageOutlined
interface PropData {
  id: string;
  customer: CustomerData | null;
}

const ProfileDetailsForm = ({ id, customer }: PropData) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [frontImage, setFrontImage] = useState<File | null>(null);

  const [backImage, setBackImage] = useState<File | null>(null);

  const [profileImage, setProfileImage] = useState<File | null>(null);

  // const [previewOpen, setPreviewOpen] = useState(false);
  const [previewOpenFront, setPreviewOpenFront] = useState(false);
  const [previewOpenBack, setPreviewOpenBack] = useState(false);
  const [previewOpenProfile, setPreviewOpenProfile] = useState(false);
  const [attachmentUrlFront, setAttachmentUrlFront] = useState("");
  // const [attachmentNameFront, setAttachmentNameFront] = useState("");
  const [attachmentUrlBack, setAttachmentUrlBack] = useState("");
  // const [attachmentNameBack, setAttachmentNameBack] = useState("");
  const [attachmentUrlProfile, setAttachmentUrlProfile] = useState("");
  // const [attachmentNameProfile, setAttachmentNameProfile] = useState("");

  const handleCancelFront = () => setPreviewOpenFront(false);
  const handleCancelBack = () => setPreviewOpenBack(false);
  const handleCancelProfile = () => setPreviewOpenProfile(false);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  // // view image
  // useEffect(() => {
  //   if (customer?.nidFront || customer?.nidBack || customer?.profilePicture) {
  //     const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  //     setAttachmentUrl(
  //       `${API_URL}/public/downloadFile/${customer?.nidFront || customer?.nidBack || customer?.profilePicture }/selfcare`
  //     );
  //     setAttachmentName(customer?.nidFront || customer?.nidBack || customer?.profilePicture);
  //   }
  // }, [customer]);
  useEffect(() => {
    if (customer) {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      setAttachmentUrlFront(
        `${API_URL}/public/downloadFile/${customer?.nidFront}/selfcare`
      );
      // setAttachmentNameFront(customer?.nidFront);
    }
  }, [customer]);

  useEffect(() => {
    if (customer) {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      setAttachmentUrlBack(
        `${API_URL}/public/downloadFile/${customer?.nidBack}/selfcare`
      );
      // setAttachmentNameBack(customer?.nidBack);
    }
  }, [customer]);

  useEffect(() => {
    if (customer) {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      setAttachmentUrlProfile(
        `${API_URL}/public/downloadFile/${customer?.profilePicture}/selfcare`
      );
      // setAttachmentNameProfile(customer?.profilePicture);
    }
  }, [customer]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const validateFileSize = (file: File) => {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSizeInBytes) {
      MySwal.fire({
        title: "Error",
        text: "File size should be not bigger than 10 MB",
        icon: "error"
      });
      return false;
    }
    return true;
  };

  // handle upload image
  const handleUpload = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const bodyData = {
          id: id
        };
        const formData = new FormData();
        // formData.append('id', id);
        formData.append("body", JSON.stringify(bodyData));
        // if (!frontImage || !backImage || !profileImage) {
        //   MySwal.fire({
        //     title: "Error",
        //     text: "Please upload all three images",
        //     icon: "error"
        //   });
        //   setLoading(false);
        //   return;
        // }
        // Check if at least one image is uploaded
        if (!frontImage && !backImage && !profileImage) {
          MySwal.fire({
            title: "Error",
            text: "Please upload at least one image",
            icon: "error"
          });
          setLoading(false);
          return;
        }

        // if (!validateFileSize(frontImage) || !validateFileSize(backImage) || !validateFileSize(profileImage)) {
        //   setLoading(false);
        //   return;
        // }
        // Validate each image individually
        if (frontImage && !validateFileSize(frontImage)) {
          setFrontImage(frontImage);
          setLoading(false);
          return;
        }
        if (backImage && !validateFileSize(backImage)) {
          setBackImage(backImage);
          setLoading(false);
          return;
        }
        if (profileImage && !validateFileSize(profileImage)) {
          setProfileImage(profileImage);
          setLoading(false);
          return;
        }
        if (frontImage) {
          formData.append("nidFront", frontImage);
        }
        // formData.append('nidFront', frontImage);
        if (backImage) {
          formData.append("nidBack", backImage);
        }
        // formData.append('nidBack', backImage);
        if (profileImage) {
          formData.append("profilePicture", profileImage);
        }
        // formData.append('profilePicture', profileImage);

        // const config: AxiosRequestConfig = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   // onUploadProgress: (progressEvent) => {
        //   //   let percentCompleted = 0;
        //   //   if (progressEvent.total !== null && progressEvent.total !== undefined) {
        //   //     percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //   //   }
        //   //   setUploadProgress(percentCompleted);
        //   // },
        // };

        await axios
          .post(`/api/customer/document-upload`, formData, {
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
              }).then(() => {
                router.reload();
              });
            }
            if (data.status == 200) {
              setFrontImage(null);
              setBackImage(null);
              setProfileImage(null);

              MySwal.fire({
                title: "Success",
                text: data.message || "Updated successfully",
                icon: "success"
              }).then(() => {
                // console.log("image data", data);

                router.reload();
              });
              // Clear the selected images after successful upload
              // Set formSubmitted to true after successful form submission
            }
            // if (data.status == 200) {
            //   MySwal.fire({
            //     title: "Success",
            //     text: data.message || "Updated successfully",
            //     icon: "success"
            //   })
            //   // .then(() => {
            //   //   router.reload();
            //   // });
            // }
          })
          .catch(err => {
            MySwal.fire({
              title: "Error",
              text: err.response.data.message || "Something went wrong",
              icon: "error"
            });
            // .then(() => {
            //   router.reload();
            // });
            setShowError(true);
            setErrorMessages(err.response.data.message);
          });
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // view image
  return (
    <>
      {/* {loading && <AppImageLoader />} */}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {/* {!loading && (  */}
      <div className="mt-8 mx-5">
        <div className="flex flex-col md:flex-row">
          <Form
            layout="vertical"
            onFinish={handleUpload}
            autoComplete="off"
            form={form}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
            className="w-full md:w-1/2 mx-5"
          >
            <Form.Item>
              <Upload
                listType="picture"
                accept=".png,.jpg"
                maxCount={1}
                onChange={info => {
                  const file = info.fileList[0]?.originFileObj;
                  if (file && validateFileSize(file)) {
                    setFrontImage(file as File);
                  }
                }}
                beforeUpload={() => false}
              >
                <Button>
                  <VerticalAlignTopOutlined /> Upload NID Front Image
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Upload
                listType="picture"
                accept=".png,.jpg"
                maxCount={1}
                onChange={info => {
                  const file = info.fileList[0]?.originFileObj;
                  if (file && validateFileSize(file)) {
                    setBackImage(file as File);
                  }
                }}
                beforeUpload={() => false}
              >
                <Button>
                  <VerticalAlignTopOutlined /> Upload NID Back Image
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Upload
                listType="picture"
                accept=".png,.jpg"
                maxCount={1}
                onChange={info => {
                  const file = info.fileList[0]?.originFileObj;
                  if (file && validateFileSize(file)) {
                    setProfileImage(file as File);
                  }
                }}
                beforeUpload={() => false}
              >
                <Button>
                  <VerticalAlignTopOutlined /> Upload Profile Picture
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                shape="round"
                style={{
                  backgroundColor: "#F15F22",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
                loading={loading}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
              {/* {uploadProgress > 0 && <Progress percent={uploadProgress} />} */}
            </Form.Item>
          </Form>
          {/* View buttons */}
          <Card className="w-full md:w-1/2">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                <div style={{ textAlign: "start" }}>
                  <h1 className="font-bold text-base">
                    Preview NID Front Image
                  </h1>
                  {customer?.nidFront && (
                    <Button onClick={() => setPreviewOpenFront(true)}>
                      {/* <FileImageOutlined /> {customer?.nidFront} */}
                      <EyeOutlined />
                    </Button>
                  )}

                  <Modal
                    open={previewOpenFront}
                    // title={attachmentNameFront}
                    footer={null}
                    onCancel={handleCancelFront}
                  >
                    <img
                      // alt={attachmentNameFront}
                      style={{ width: "100%", padding: "2rem 0" }}
                      src={attachmentUrlFront}
                    />
                  </Modal>
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* nidback */}
                <div style={{ textAlign: "start" }}>
                  <h1 className="font-bold text-base">
                    Preview NID Back Image
                  </h1>
                  {customer?.nidBack && (
                    <Button onClick={() => setPreviewOpenBack(true)}>
                      {/* <FileImageOutlined /> {customer?.nidBack} */}
                      <EyeOutlined />
                    </Button>
                  )}

                  <Modal
                    open={previewOpenBack}
                    // title={attachmentNameBack}
                    footer={null}
                    onCancel={handleCancelBack}
                  >
                    <img
                      // alt={attachmentNameBack}
                      style={{ width: "100%", padding: "2rem 0" }}
                      src={attachmentUrlBack}
                    />
                  </Modal>
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* profile */}

                <div style={{ textAlign: "start" }}>
                  <h1 className="font-bold text-base">Preview Profile Image</h1>
                  {customer?.profilePicture && (
                    <Button onClick={() => setPreviewOpenProfile(true)}>
                      {/* <FileImageOutlined /> {customer?.profilePicture} */}
                      <EyeOutlined />
                    </Button>
                  )}

                  <Modal
                    open={previewOpenProfile}
                    // title={attachmentNameProfile}
                    footer={null}
                    onCancel={handleCancelProfile}
                  >
                    <img
                      // alt={attachmentNameProfile}
                      style={{ width: "100%", padding: "2rem 0" }}
                      src={attachmentUrlProfile}
                    />
                  </Modal>
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              ></Col>
            </Row>
          </Card>
        </div>

        <div className="bg-gray-400 flex flex-col gap-1 my-5">
          <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
            <div className="col-span-11 xl:-ml-5">
              <p className="text-blue-600 font-semibold text-left text-lg">
                <span className="text-danger">
                  * Attachment must be either JPG or PNG format and should not
                  exceed 10 MB in size.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetailsForm;
