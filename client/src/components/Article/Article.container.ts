import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'store/reducers';
import { Article } from './Article.component';

const mapState = (state: AppState) => ({});
const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(
  mapState,
  mapDispatch
)(Article);
