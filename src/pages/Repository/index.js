import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';


import Container from '../../components/Container';
import { Loading, Owner, IssueList, LabelIssue } from './styles';

export default class Repository extends Component{
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true
  };

  async componentDidMount(){
    const {match} = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    // usando desestruturação
    // as posiçoes do array abaixo correspondem as possições que o array
    // da promise retorna.
    // Promise.all - serve para fazer multiplas requisições, sem esperar
    // uma acabar para começar outra
    const [ repository, issues ] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),{
        params: {
          state: 'open',
          per_page: 5,
        }
      }
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });

  }

  render(){
    const { repository, issues, loading } = this.state;

    if (loading){
      return <Loading>Carregando...</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue =>(
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login}/>
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {console.log(issue.labels)}
                  {issue.labels.map(label =>(
                    <LabelIssue key={String(label.id)} labelColor={label.color}>{label.name}</LabelIssue>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
};
