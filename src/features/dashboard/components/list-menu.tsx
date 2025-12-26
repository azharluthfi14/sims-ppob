import type { Service } from '@/store/modules/information';

interface Props {
  services: Service[];
  handleClick: (service: Service) => void;
}

export const ListMenu = ({ services, handleClick }: Props) => {
  return (
    <div className="layout grid grid-cols-12 gap-x-6">
      {services?.map((service, i) => (
        <div
          onClick={() => handleClick(service)}
          key={i}
          className="flex cursor-pointer flex-col items-center space-y-2">
          <div>
            <img src={service.service_icon} alt="icon-service" className="size-16" />
          </div>
          <h4 className="text-center text-xs">{service.service_name}</h4>
        </div>
      ))}
    </div>
  );
};
