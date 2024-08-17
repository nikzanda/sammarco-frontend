import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Empty, Form, Row, Upload, Image, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { MemberDetailFragment } from '../../../generated/graphql';
import { DatePicker } from '../../../components';

const readFileAsDataURL = async (file: File) => {
  const dataUri = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  return dataUri;
};

interface Props {
  member: MemberDetailFragment;
}

const MemberMedicalCertificate: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  const attachmentPreview = React.useMemo(() => {
    if (!member.medicalCertificate?.base64) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    const { base64 } = member.medicalCertificate;
    const fileType = base64.slice(5, base64.indexOf(';base64,'));

    if (fileType === 'application/pdf') {
      return <embed src={member.medicalCertificate.base64} width="1000" height="1000" />;
    }

    return <Image src={base64} />;
  }, [member.medicalCertificate]);

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('members.form.expireAt')}
            name={['medicalCertificate', 'expireAt']}
            getValueProps={(v: number) => {
              if (v) {
                return { value: new Date(v) };
              }
              return { value: undefined };
            }}
            getValueFromEvent={(v: Date) => {
              if (v) {
                return v.getTime();
              }
              return null;
            }}
            rules={[{ required: true }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Upload.Dragger
            accept="image/*, application/pdf"
            maxCount={1}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess!('ok');
              }, 0);
            }}
            onChange={async (info) => {
              const filesDataUri = await Promise.all(
                info.fileList.map(({ originFileObj }) => readFileAsDataURL(originFileObj! as File))
              );
              const result = info.fileList.map((_, index) => filesDataUri[index] as string);
              form.setFieldValue(['medicalCertificate', 'base64'], result[0]);
            }}
            onRemove={() => {
              form.setFieldValue(['medicalCertificate', 'base64'], undefined);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('upload.clickOrDrag')}</p>
            <p className="ant-upload-hint">{t('upload.hint')}</p>
          </Upload.Dragger>
        </Col>
      </Row>

      <Form.Item noStyle name={['medicalCertificate', 'base64']}>
        <Input type="hidden" />
      </Form.Item>

      <br />

      <Row justify="center">{attachmentPreview}</Row>
    </>
  );
};

export default MemberMedicalCertificate;
