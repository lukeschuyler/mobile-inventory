import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modalView: {
    flex: 1
  },
  infoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  qtyConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  qtyInput: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginLeft: 80, 
    marginRight: 80, 
    marginBottom: 15,
    padding: 5,
    color: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,0,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  enterBtn: {
    backgroundColor: 'rgba(255,255,0,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  productImage: {
    height: 100,
    width: 300,
  },
  navContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontSize: 21,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Avenir-Medium'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    fontFamily: 'Avenir-Medium'
  },
  buttonTouchable: {
    padding: 50
  },
  reviewSection: {
    flex: 1
  },
  reviewHeaderContainer: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  reviewScroll: {
    flex: 5
  },
  reviewItem: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, .05)',
    marginLeft: 20, 
    marginRight: 20,
    marginBottom: 20,
    borderColor: 'gray', 
    padding: 5,
    margin: 10,
    borderRadius: 10
  },
  reviewItemEdit: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20, 
    marginRight: 20,
    borderColor: 'gray', 
    padding: 5,
    margin: 10,
    borderRadius: 10,
    height: 100,
    alignItems: 'center'
  },
  doneBtn: {
    height:60,
    width:60,
    borderRadius: 100,
    backgroundColor: 'rgba(217,24,31,.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7
  },
  reviewInput: {
    height: 40, 
    borderColor: 'white', 
    borderWidth: 1, 
    width: 60,
    borderRadius: 5,
    paddingLeft: 5,
    marginRight: 5
  },
  reviewHeader: {
    fontSize: 20,
    fontWeight: '300',
    color: '#333',
    fontFamily: 'Avenir-Medium',
  },
  itemLabel: {
    flex: 1,
    justifyContent: 'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  doneText: {
    fontSize: 17
  }
});

export default styles;
