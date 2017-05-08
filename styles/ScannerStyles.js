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
    height: 200,
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
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 50
  },
  reviewSection: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewHeader: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewScroll: {
    flex: 5,
    alignItems: 'center'
  },
  reviewInput: {
    width: 50
  }
});

export default styles;
