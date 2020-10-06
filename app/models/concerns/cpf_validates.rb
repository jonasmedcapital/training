module CpfValidates
  extend ActiveSupport::Concern

  included do
    before_save -> { cpf_validate }
  end

  def cpf_validate
    eleven_cpf = ["00000000000",
                  "11111111111",
                  "22222222222",
                  "33333333333",
                  "44444444444",
                  "55555555555",
                  "66666666666",
                  "77777777777",
                  "88888888888",
                  "99999999999"]
    
    if self.cpf
      if self.cpf.chars.count != 11
        errors.add(:cpf, "CPF Inválido. ")
      elsif eleven_cpf.include?(self.cpf)
        errors.add(:cpf, "CPF Inválido. ")
      else
        cpf_root = self.cpf.chars[0 .. 8].map{|i| i.to_i}

        # calculate first digit
        sum = (0..8).inject(0) do |sum, i|
          sum + cpf_root[i] * (10 - i)
        end

        first_validator = sum % 11
        first_validator = first_validator < 2 ? 0 : 11 - first_validator
        cpf_root << first_validator

        # calculate second digit
        sum = (0..8).inject(0) do |sum, i|
          sum + cpf_root[i] * (11 - i)
        end

        sum += first_validator * 2

        second_validator = sum % 11
        second_validator = second_validator < 2 ? 0 : 11 - second_validator
        (cpf_root << second_validator).join

        if cpf_root.join != self.cpf
          errors.add(:cpf, "CPF Inválido. ")
        end
      end
    else
      errors.add(:cpf, "CPF Inválido. ")
    end
  end
  

end