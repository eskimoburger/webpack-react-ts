import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Typography } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AxiosError } from "axios";
import { Auth, AuthRequest } from "../api/auth";

const AntDLogin = () => {
  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement: NotificationPlacement) => {
    api.success({
      message: "Login successfully!",
      placement,
      duration: 2,
    });
  };
  const openErrorNotification = (
    placement: NotificationPlacement,
    message: string
  ) => {
    api.error({
      message,
      placement,
      duration: 2,
    });
  };
  const onFinish = (values: AuthRequest) => {
    Auth({ username: values.username, password: values.password })
      .then((r) => {
        const { data } = r.data;
        openSuccessNotification("topRight");
        Object.keys(data).forEach((key) => {
          localStorage.setItem(key, data[key]);
        });
        window.location.reload();
      })
      .catch((err: AxiosError) => {
        openErrorNotification("topRight", err.message);
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        style={{ width: 600, padding: 10 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Typography.Title>Aquater</Typography.Title>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Typography.Link strong>Forgot password</Typography.Link>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: 10 }}
          >
            Log in
          </Button>
          Or <Typography.Link strong>Register Now!</Typography.Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default AntDLogin;
