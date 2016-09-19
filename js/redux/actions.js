
// this.props.dispatch({ type: 'server/findGame', data: { input: this.refs.value, state: this.props.state } }); }


const ON_LOAD = 'ON_LOAD';
function onLoad() {
    return {
        type: ON_LOAD
    };
};

const SUBMIT_NAME = 'SUBMIT_NAME'
function submitName() {
  return {
    type: SUBMIT_NAME
  };
};
