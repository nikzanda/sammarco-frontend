import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Empty, Form, Row, Image, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { EmailAttachmentInput, MedicalCertificateTypeEnum, MemberDetailFragment } from '../../../gql/graphql';
import { DatePicker } from '../../../components';
import { AttachmentInput } from '../../../commons';

interface Props {
  member: MemberDetailFragment;
}

const MemberMedicalCertificate: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();

  const attachmentPreview = React.useMemo(() => {
    if (!member.currentEnrollment?.medicalCertificateKey) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    const { medicalCertificateKey } = member.currentEnrollment;
    const fileType = medicalCertificateKey.slice(5, medicalCertificateKey.indexOf(';base64,'));

    if (fileType === 'application/pdf') {
      return <embed src={medicalCertificateKey} width="1000" height="1000" />;
    }

    return <Image src={medicalCertificateKey} />;
  }, [member.currentEnrollment]);

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('members.form.medicalCertificate.expireAt')}
            name={['enrollment', 'medicalCertificateExpireAt']}
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

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.medicalCertificate.type')} name={['enrollment', 'medicalCertificateType']}>
            <Select
              allowClear
              options={Object.keys(MedicalCertificateTypeEnum).map((type) => ({
                label: t(`members.medicalCertificateType.${type}`),
                value: type,
              }))}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            noStyle
            name={['enrollment', 'medicalCertificateKey']}
            getValueFromEvent={(e: EmailAttachmentInput[]) => {
              if (e && e.length === 1) {
                return e[0].path;
              }
              return undefined;
            }}
          >
            <AttachmentInput
              dragger
              accept="image/*, application/pdf"
              maxCount={1}
              multiple={false}
              listType="picture-card"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t('members.form.medicalCertificate.help.clickOrDrag')}</p>
              <p className="ant-upload-hint">{t('members.form.medicalCertificate.help.hint')}</p>
            </AttachmentInput>
          </Form.Item>
        </Col>
      </Row>

      <br />

      <Row justify="center">{attachmentPreview}</Row>
    </>
  );
};

export default MemberMedicalCertificate;
