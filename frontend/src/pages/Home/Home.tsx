// Home.tsx
import { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import MapView from '../../components/MapView/MapView';
import VehicleCard from '../../components/VehicleCard/VehicleCard';

const MOCK_VEHICLE = {
  plate: 'BPZ4295',
  vin: '34405892075660',
  color: '#FFEB3B',
  picture: {
    address: 'https://s3.amazonaws.com/softruck.fleetview/production/picture/c571fb1e-3906-4ee3-b4c4-7be9ad031d33_Semtítulo.png'
  }
};

export default function Home() {
    const [selectedVehicle, setSelectedVehicle] = useState<typeof MOCK_VEHICLE | null>(null);
const [visibleVehicle, setVisibleVehicle] = useState<typeof MOCK_VEHICLE | null>(null);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  if (selectedVehicle) {
    setVisibleVehicle(selectedVehicle); // atualiza o card
    setIsVisible(true);
  } else {
    // inicia fade-out e só depois apaga os dados
    setIsVisible(false);
    const timeout = setTimeout(() => setVisibleVehicle(null), 300);
    return () => clearTimeout(timeout);
  }
}, [selectedVehicle]);

    return (
    <AppLayout
        sidebar={<Sidebar onSelectVehicle={setSelectedVehicle} />}
        vehicleCard={
        visibleVehicle ? (
            <div className={`vehicle-fade ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <VehicleCard
                plate={visibleVehicle.plate}
                vin={visibleVehicle.vin}
                color={visibleVehicle.color}
                pictureUrl={visibleVehicle.picture?.address}
                visible={true}
            />
            </div>
        ) : null
        }
    >
        <MapView />
    </AppLayout>
    );
}