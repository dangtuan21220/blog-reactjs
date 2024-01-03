import { Button, Card, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth";
import { setUserToken } from "store/slice/auth";

type FieldType = {
  email?: string;
  password?: string;
};

const SignInContainer = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const onFinish = async (values: any) => {
    const res = await login(values);
    if (res.status === 201) {
      dispath(setUserToken(res.data.access_token));
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card bordered={false} style={{ width: 600 }}>
        <h2 className="text-3xl">Sign In</h2>
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="mt-6"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <p
          className="cursor-pointer text-[#624bff] hover:opacity-80"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create An Account
        </p>
      </Card>
    </>
  );
};

export default SignInContainer;
