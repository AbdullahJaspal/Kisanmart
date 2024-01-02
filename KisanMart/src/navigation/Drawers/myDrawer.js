import {createDrawerNavigator} from '@react-navigation/drawer';
import BuyerHome from '../../screens/buyerSide/home/home';
import CustomDrawerContent from './customDrawer';
import {useTranslation} from 'react-i18next';
import CategoryListing from '../../screens/buyerSide/categoryListing/categoryListing';
import ProductDetail from '../../screens/buyerSide/productDetail/productDetail';
import Conversion from '../../screens/buyerSide/coversations/conversations';
import ChatScreen from '../../screens/buyerSide/chatScreen/chatScreen';
import MyDeals from '../../screens/buyerSide/myDeals/myDeals';
import TermsConditions from '../../screens/buyerSide/terms&Conditions/terms&Conditions';
import PrivacyPolicy from '../../screens/buyerSide/privacyPolicy/privacyPolicy';
import Notification from '../../screens/buyerSide/notification/notification';
import DealDetail from '../../screens/buyerSide/dealDetails/dealDetails';
import MyDealStack from '../stacks/myDealStack';
import HomeStack from '../stacks/homeStack';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const {t, i18n} = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={{
        headerShown: false,
        drawerPosition: i18n.language === 'urd' ? 'right' : 'left',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* screens */}
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
      <Drawer.Screen name="MyDealStack" component={MyDealStack} />
      <Drawer.Screen name="Conversion" component={Conversion} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="TermsConditions" component={TermsConditions} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
