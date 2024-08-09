import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Empty, Form, FormInstance, Row, Upload, UploadProps, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { MemberDetailFragment } from '../../../generated/graphql';
import { DatePicker } from '../../../components';

interface Props {
  member: MemberDetailFragment;
  form: FormInstance<any>;
}

const MemberMedicalCertificate: React.FC<Props> = ({ member, form }) => {
  const { t } = useTranslation();

  const handleBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

    return false;
  };

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
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Upload.Dragger
            accept="image/*, application/pdf"
            beforeUpload={handleBeforeUpload}
            maxCount={1}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('upload.clickOrDrag')}</p>
            <p className="ant-upload-hint">{t('upload.hint')}</p>
          </Upload.Dragger>
        </Col>
      </Row>

      <br />

      <Row justify="center">{attachmentPreview}</Row>
    </>
  );
};

export default MemberMedicalCertificate;
