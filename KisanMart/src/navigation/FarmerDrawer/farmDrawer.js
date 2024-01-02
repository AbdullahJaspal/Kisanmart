import {createDrawerNavigator} from '@react-navigation/drawer';
import BuyerHome from '../../screens/sellerSide/home/home';
import CustomDrawerContent from './FarmerDrawer';
import {useTranslation} from 'react-i18next';
import CategoryListing from '../../screens/sellerSide/categoryListing/categoryListing';
import ProductDetail from '../../screens/sellerSide/productDetail/productDetail';
import Conversion from '../../screens/sellerSide/coversations/conversations';
import ChatScreen from '../../screens/sellerSide/chatScreen/chatScreen';
import MyDeals from '../../screens/sellerSide/myDeals/myDeals';
import TermsConditions from '../../screens/sellerSide/terms&Conditions/terms&Conditions';
import PrivacyPolicy from '../../screens/sellerSide/privacyPolicy/privacyPolicy';
import Notification from '../../screens/sellerSide/notification/notification';
import DealDetail from '../../screens/sellerSide/dealDetails/dealDetails';
import MyDealStack from '../stacks/myDealStack';
import HomeStack from '../stacks/homeStack';
import SellerHomeStack from '../stacks/sellerHomeStack';

const Drawer = createDrawerNavigator();

function FarmerDrawer({}) {
  const {t, i18n} = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName={'SellerHomeStack'}
      screenOptions={{
        headerShown: false,
        drawerPosition: i18n.language === 'urd' ? 'right' : 'left',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* screens */}
      <Drawer.Screen name="SellerHomeStack" component={SellerHomeStack} />
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

export default FarmerDrawer;
