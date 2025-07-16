import React, { useState } from "react";

const SearchableSelect = ({ users, selectedUserId, setSelectedUserId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filtra os usuários com base no termo de pesquisa
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setSearchTerm(""); // Limpa o campo de pesquisa ao selecionar
    setIsOpen(false); // Fecha o dropdown
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pesquisar Credor
      </label>
      <div className="w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay para permitir a seleção
          placeholder="Pesquise por nome..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleSelectUser(user._id)}
                  className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                >
                  {user.nome}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">
                Nenhum usuário encontrado
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
