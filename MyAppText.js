class MyAppHeaderText extends Component {
  render() {
    return (
      <MyAppText>
        <Text style={{ fontFamily:  }}>{this.props.children}</Text>
      </MyAppText>
    );
  }
}
