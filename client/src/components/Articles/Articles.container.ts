import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Articles } from './Articles.component';
import { AppState } from 'store/reducers';

const mapState = (state: AppState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(
  mapState,
  mapDispatch
)(Articles);
