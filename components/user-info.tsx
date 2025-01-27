import { User as UserIcon, Mail, Phone, IdCard } from "lucide-react";

// Função para formatar CPF
const formatCPF = (cpf: string) => {
  return cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Função para formatar o telefone
const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const UserInfoSkeleton = ({
  loading,
  user,
  cpf,
  phoneNumber,
}: {
  loading: boolean;
  user: any;
  cpf?: string | null;
  phoneNumber?: string | null;
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-36 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <UserIcon className="w-6 h-6 text-gray-500" />
        <span>{user?.firstName || "N/A"}</span>
      </div>
      <div className="flex items-center space-x-3">
        <Mail className="w-6 h-6 text-gray-500" />
        <span>{user?.emailAddresses[0]?.emailAddress || "N/A"}</span>
      </div>
      {cpf && (
        <div className="flex items-center space-x-3">
          <IdCard className="w-6 h-6 text-gray-500" />
          <span>{formatCPF(cpf)}</span>
        </div>
      )}
      {phoneNumber && (
        <div className="flex items-center space-x-3">
          <Phone className="w-6 h-6 text-gray-500" />
          <span>{formatPhoneNumber(phoneNumber)}</span>
        </div>
      )}
    </div>
  );
};

export default UserInfoSkeleton;
