import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Useapi from 'src/services/api'
import { doLogin } from '../../../helper/AuthHandler';

const Login = () => {

  const api = Useapi();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [labelB, setLabelB] = React.useState('Entrar');
  const [error, setError] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setLabelB('Carregando');

    if (!email) {
        setError("Informe um e-mail!");
        setDisabled(false);
        setLabelB('Entrar');

    }else{
      if(!password){
        setError("Informe sua senha!");
        setDisabled(false);
        setLabelB('Entrar');

      }else {
        const json = await api.login(email, password);

        if (json.error) {
          setError(json.error);
          setDisabled(false);
          setLabelB('Entrar');
        } else {
          doLogin(json.token);
          window.location.href = '/dashboard';
          setDisabled(false);
          setLabelB('Entrar');
        }
      }
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {error &&
                    <CAlert color="danger" closeButton>
                      {error}
                    </CAlert>
                  }

                  <CForm onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <p className="text-muted">Faça login em sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        disabled={disabled}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        disabled={disabled}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />

                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handleSubmit} disabled={disabled}>{labelB}</CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <CForm>
                    <h1>Agendar Refeição</h1>
                    <p className="text-muted">Clique para marcar a sua refeição</p>
                    <CCol>
                      <CButton color="light" variant="outline" className="px-4">Agendar</CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
