import React from 'react';
import { useTranslation } from 'react-i18next';
import { App, Col, Empty, Form, FormInstance, Row, Upload, UploadProps, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { MemberDetailFragment, useMemberUploadMutation } from '../../../generated/graphql';
import { DatePicker } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  member: MemberDetailFragment;
  form: FormInstance<any>;
};

const MemberMedicalCertificate: React.FC<Props> = ({ member, form }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [uploadAttachment, { error }] = useMemberUploadMutation({
    refetchQueries: ['Member'],
    onCompleted: () => {
      message.success(t('upload.success'));
    },
  });

  useDisplayGraphQLErrors(error);

  const handleBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

    const extension = file.name.split('.').pop() || '';

    uploadAttachment({
      variables: {
        input: {
          id: member.id,
          attachment: base64,
          extension,
        },
      },
    });

    return false;
  };

  const attachmentPreview = React.useMemo(() => {
    if (!member.medicalCertificate?.attachment) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    const { attachment } = member.medicalCertificate;
    const fileType = attachment.slice(5, attachment.indexOf(';base64,'));

    if (fileType === 'application/pdf') {
      return <embed src={member.medicalCertificate.attachment} width="1000" height="1000" />;
    }

    return <Image src={attachment} />;
  }, [member.medicalCertificate]);

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            label={t('members.form.expireAt')}
            name="certificateExpiryDate"
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
