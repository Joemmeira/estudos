import { EditOutlined, EllipsisOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Dropdown,
  Flex,
  List,
  Menu,
  Space,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import moment from 'moment';
import React from 'react';
import aptDB from '../dbjson/aptoolsDB.json';
import dataDB from '../dbjson/dbPage2.json';
import myDB from '../dbjson/myDB.json';
const corStatus = ['blue', 'yellow', 'green'];
const { Meta } = Card;
const myTitle=myDB.Cards;
const myData=myTitle.map((todo)=>{return todo.todos})

const Cards = () => (<>
  <Space style={{backgroundColor:'grey'}}>
  <Card hoverable={true}//Card 1
    style={{width: 250,overflowY:'scroll',height: '400px'}}
    cover={<h3>{myDB.Cards[0].titles}</h3>}
  ><Card type='inner'
    title={myDB.Cards.map((todo)=>{
      if(todo.pkey==="0")return(<h5>{todo.todos.map((i)=>{
        if(i.id==="N0")return (<>{i.tipo} {i.status}</>)})}</h5>)})}>
    {myDB.Cards.map((t)=>{if(t.pkey==="0")return(<a>{t.todos.map((i)=>{
      if(i.id==="N0")return i.resumo})}</a>)})}
  </Card><Card type='inner'
    title={myDB.Cards.map((t)=>{
      if(t.pkey==="0")return(<h5>{t.todos.map((i)=>{
        if(i.id==="N1")return (<>{i.tipo} {i.status}</>)})}</h5>)})}>
          {myDB.Cards.map((t)=>{if(t.pkey==="0")return(<a>{t.todos.map((i)=>{
      if(i.id==="N1")return i.resumo})}</a>)})}</Card>
  </Card>
  <Card hoverable //Card 2
  style={{width: 300,overflowY:'scroll',height: '400px'}}
  cover={<h3>{myTitle[1].titles}</h3>}
><Card type='inner'
  title={<>{myData[1][0].tipo} {myData[1][0].status}</>}
  actions={[<>{myData[1][0].criado}</>]}><a>{myData[1][0].resumo}</a>
  </Card><Card type='inner'
  title={<>{myData[1][1].tipo} {myData[1][1].status}</>}
  actions={[<>{myData[1][1].criado}</>]}><a>{myData[1][1].resumo}</a>
  </Card><Card type='inner'
  title={<>{myData[1][2].tipo} {myData[1][2].status}</>}
  actions={[<>{myData[1][2].criado}</>]}><a>{myData[1][2].resumo}</a></Card>
  </Card>
<Card hoverable //Card 3
style={{width:300,overflowY:'scroll',height: '400px'}} cover={<h3>{myDB.Cards[2].pkey}</h3>}>
<List dataSource={myDB.Cards} renderItem={(item)=>(
  <List.Item><Card type='inner' title={item.todos[0].tipo}>{
    item.todos[0].resumo}</Card></List.Item>)}></List>
</Card>
  <Card hoverable//Card 4
    title={'Meus Chamdos'}
    style={{width:600}}
    // actions={[<SettingOutlined key="setting" />,<EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,]}
  >
    <List style={{overflowY:'scroll',height: '400px'}} 
    dataSource={aptDB} renderItem={(item)=><List.Item >
      <Card hoverable type='inner' 
      title={<Flex justify='space-between'>
      <Typography.Link >{item.pkey}</Typography.Link>
      <Tag color={corStatus[item.nmStatus]}>
        {item.sla}</Tag></Flex>}>
          <Descriptions  size='small'>
            <Descriptions.Item label='Criador'>{item.criador}</Descriptions.Item>
            <Descriptions.Item label='Data'>{item.data}</Descriptions.Item></Descriptions>
          {item.descrição}
          </Card>
    </List.Item>}/>
  </Card>
  
  <Card hoverable
    style={{width: 300}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=4" />}
      title="Card title 5"
      description="This is the description 5"/>
  </Card><Card hoverable
    style={{width: 300}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=5" />}
      title="Card title 6"
      description="This is the description 6"/>
  </Card>
  </Space>

{/* Lista */}
  <List grid={{gutter:3,column:4}} style={{background:'darkgray'}} 
  dataSource={dataDB} renderItem={
    (item,i)=><List.Item ><Card size='small'title={<Flex 
    gap="small"align='start'justify='space-between'>
      {item.nuFaturamentoSus}
      {item.nmTipoFaturamento}
      <Dropdown 
      overlay={
      <Menu><Menu.Item key="0"disabled={item.flStatus===0}>
        Em Aberto</Menu.Item>
        <Menu.Item key="1"disabled={item.flStatus===1}>
          Processamentos</Menu.Item>
        <Menu.Item key="2"disabled={item.flStatus===2}>
          Faturado</Menu.Item>
        </Menu>}>
          <Button type='text'>
            <Tag color={corStatus[item.flStatus]}>
            {item.nmStatus}
            </Tag>
          </Button>
      </Dropdown>
    </Flex>}>
      <Descriptions layout='vertical'size='small'>
        <Descriptions.Item label="Mês">
          {moment(item.dtMes,'YYYY-MM-DD').format('MM/YYYY')}
        </Descriptions.Item><Descriptions.Item label='Produção'>
          {moment(item.dtProducao,'yyyy-mm-dd').format('mm/yyyy')}
        </Descriptions.Item><Descriptions.Item label='Fechamento'>
          {moment(item.dtFechamentoBpa,'yyyy-mm-dd').format('mm/yyyy')}
        </Descriptions.Item>
      </Descriptions>
      <HomeOutlined /> {item.nmHospital} {item.nmOrgao}
      <Tooltip title='Grupo'><Tag>{item.dsGrupoBpa}</Tag></Tooltip>
      {item.flExtra === 'S' && <Tag>EXTRA</Tag>}
      {item.flReapresentacao === 'S' && <Tag>REAPRESENTAÇÃO</Tag>}
      <Divider/>
      <Flex gap="small"justify='stretch'>
        <EditOutlined key='edit'/>
        <SettingOutlined key='setting'/>
      </Flex>
      </Card></List.Item>}/>
  </>
);

export default Cards;