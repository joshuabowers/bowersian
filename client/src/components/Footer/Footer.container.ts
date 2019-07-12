import { connect } from 'react-redux';
import { Footer } from './Footer.component';
import { AppState } from 'store/reducers';
import { Dispatch } from 'redux';

const mapState = (state: AppState) => ({});
const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(
  mapState,
  mapDispatch
)(Footer);
