/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import {SettingOutlined,EditOutlined,MedicineBoxOutlined,CloseSquareOutlined,
  FieldNumberOutlined,HomeOutlined,InfoCircleOutlined} from '@ant-design/icons';
import {List,Card,Avatar,Badge,Tag,Button,Menu,Descriptions,message,Divider,
  Tooltip,Dropdown,Col,Row} from 'antd';
import moment from 'moment';
import P2 from '../dbjson/dbPage2.json';
const { Meta } = Card;
const { Ribbon } = Badge;
const corStatus = ['blue', 'yellow', 'green'];
const data = P2;
const renders = [
  (item) => (
    <Card className="apt-card-sombra">
      <Badge.Ribbon text={item.nmStatus} color={corStatus[item.flStatus]}>
        <Meta
          avatar={<Avatar>{item.nmTipoFaturamento}</Avatar>}
          title={`Nº: ${item.nuFaturamentoSus}`}
          description={
            <Descriptions layout="vertical" size="small">
              <Descriptions.Item label="Mês">
                {moment(item.dtMes, 'YYYY-MM-DD').format('MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Produção">
                {moment(item.dtProducao, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Fechamento">
                {moment(item.dtFechamentoBpa, 'YYYY-MM-DD').format(
                  'DD/MM/YYYY'
                )}
              </Descriptions.Item>
            </Descriptions>
          }
        />
      </Badge.Ribbon>
      <HomeOutlined /> {item.nmHospital}
      <br />
      <MedicineBoxOutlined /> {item.nmOrgao}
      <Divider />
      <Tooltip title="Status">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0" disabled={item.flStatus === 0}>
                Em aberto
              </Menu.Item>
              <Menu.Item key="1" disabled={item.flStatus === 1}>
                Processamentos
              </Menu.Item>
              <Menu.Item key="2" disabled={item.flStatus === 2}>
                Faturado
              </Menu.Item>
            </Menu>
          }
        >
          <Tag color={corStatus[item.flStatus]}>{item.nmStatus}</Tag>
        </Dropdown>
      </Tooltip>
      <Tooltip title="Grupo">
        <Tag>{item.dsGrupoBpa}</Tag>
      </Tooltip>
      {item.flExtra === 'S' && <Tag>EXTRA</Tag>}
      {item.flReapresentacao === 'S' && <Tag>REAPRESENTAÇÃO</Tag>}
      <Divider />
      <Row gutter={10}>
        <Col>
          <EditOutlined
            style={{ fontSize: '20px', color: '#CCCC00' }}
            key="edit"
          />
        </Col>
        <Col>
          <InfoCircleOutlined
            key="setting"
            style={{ fontSize: '20px', color: 'blue' }}
          />
        </Col>
        <Col>
          <SettingOutlined style={{ fontSize: '20px', color: 'green' }} />
        </Col>
        <Col flex="auto" style={{ textAlign: 'end' }}>
          <CloseSquareOutlined
            key="setting"
            style={{ fontSize: '20px', color: 'red' }}/>
        </Col>
      </Row>
    </Card>
  ),
  (item) => (
    <Card
      className="apt-card-sombra"
      size="small"
      title={
        <Row gutter={5}>
          <Col span={2}>{item.nuFaturamentoSus}</Col>
          <Col>{item.nmTipoFaturamento}</Col>
          <Col flex="auto" style={{ textAlign: 'end' }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0" disabled={item.flStatus === 0}>
                    Em aberto
                  </Menu.Item>
                  <Menu.Item key="1" disabled={item.flStatus === 1}>
                    Processamentos
                  </Menu.Item>
                  <Menu.Item key="2" disabled={item.flStatus === 2}>
                    Faturado
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="text">
                <Tag color={corStatus[item.flStatus]}>{item.nmStatus}</Tag>
              </Button>
            </Dropdown>
          </Col>
        </Row>
      }
    >
      <Descriptions layout="vertical" size="small">
        <Descriptions.Item label="Mês">
          {moment(item.dtMes, 'YYYY-MM-DD').format('MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Produção">
          {moment(item.dtProducao, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Fechamento">
          {moment(item.dtFechamentoBpa, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Descriptions.Item>
      </Descriptions>
      <HomeOutlined /> {item.nmHospital}
      <br />
      <MedicineBoxOutlined /> {item.nmOrgao}
      <br />
      <br />
      <Tooltip title="Grupo">
        <Tag>{item.dsGrupoBpa}</Tag>
      </Tooltip>
      {item.flExtra === 'S' && <Tag>EXTRA</Tag>}
      {item.flReapresentacao === 'S' && <Tag>REAPRESENTAÇÃO</Tag>}
      <Divider />
      <Row gutter={10}>
        <Col>
          <EditOutlined
            style={{ fontSize: '20px', color: '#08c', fontWeight: 'bold' }}
            key="edit"
          />
        </Col>
        <Col>
          <InfoCircleOutlined key="setting" />
        </Col>
        <Col>
          <SettingOutlined key="setting" />
        </Col>
        <Col flex="auto" style={{ textAlign: 'end' }}>
          <CloseSquareOutlined key="setting" />
        </Col>
      </Row>
    </Card>
  ),
  (item) => (
    <Card
      title={
        <Meta
          avatar={<Avatar>{item.nmTipoFaturamento}</Avatar>}
          title={item.nmHospital}
          description={item.nmOrgao}
        />
      }
      actions={[
        <EditOutlined size="small" key="edit" />,
        <SettingOutlined size="small" key="setting" />,
        <InfoCircleOutlined size="small" key="setting" />,
        <CloseSquareOutlined size="small" key="setting" />
      ]}
      extra={
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0" disabled={item.flStatus === 0}>
                Em aberto
              </Menu.Item>
              <Menu.Item key="1" disabled={item.flStatus === 1}>
                Processamentos
              </Menu.Item>
              <Menu.Item key="2" disabled={item.flStatus === 2}>
                Faturado
              </Menu.Item>
            </Menu>
          }
        >
          <Tag color={corStatus[item.flStatus]}>{item.nmStatus}</Tag>
        </Dropdown>
      }
      cover={
        <div style={{ padding: 10 }}>
          <Descriptions layout="vertical" size="small">
            <Descriptions.Item label="Mês">
              {moment(item.dtMes, 'YYYY-MM-DD').format('MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Produção">
              {moment(item.dtProducao, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Fechamento">
              {moment(item.dtFechamentoBpa, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </div>
      }
    >
      <>
        <Tag>
          <FieldNumberOutlined /> {item.nuFaturamentoSus}
        </Tag>
        <Tooltip title="Grupo">
          <Tag>{item.dsGrupoBpa}</Tag>
        </Tooltip>
        {item.flExtra === 'S' && <Tag>Extra</Tag>}
        {item.flReapresentacao === 'S' && <Tag>Reapresentação</Tag>}
      </>
    </Card>
  )
];

export const Page2 = () => {
  const [viewId, setViewId] = useState(1);

  const mergePageConfig = useStoreActions(
    (actions) => actions.menu.mergePageConfig);

  useEffect(() => {
    mergePageConfig({
      searchConfig: undefined,
      barActions: [
        {
          icon: HomeOutlined,
          title: 'Acao float 1',
          action: () => {message.info('actionf 1');}
        }
      ],
      floatActions: [
        {
          icon: HomeOutlined,
          title: 'Acao float 1',
          action: () => {message.info('actionf 1');}
        }
      ]
    });
  }, []);

  return (
    <>
      <Menu
        onClick={(item) => {setViewId(parseInt(item.key));}}
        selectedKeys={[`${viewId}`]}
        mode="horizontal">
        <Menu.Item key="0">Card tipo 0</Menu.Item>
        <Menu.Item key="1">Card tipo 1</Menu.Item>
        <Menu.Item key="2">Card tipo 2</Menu.Item>
      </Menu>
      <br />
      <List
        grid={{gutter: 16,xs: 1,sm: 1,md: 2,lg: 2,xl: 3,xxl: 4}}
        dataSource={data}
        renderItem={(item, i) => 
        <List.Item>{renders[viewId](item)}</List.Item>}/>
    </>
  );
};
export default Page2;