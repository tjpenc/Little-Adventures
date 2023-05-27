import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleUserDiscovery } from '../../../api/discoveriesData';
import BigDiscoveryCard from '../../../components/BigDiscoveryCard';

// view single discovery form
export default function ViewSingleDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  const routeToMyDiscoveries = () => {
    router.push('/discoveries/personal/myDiscoveries');
  };

  useEffect(() => {
    getSingleUserDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={routeToMyDiscoveries} />;
}
