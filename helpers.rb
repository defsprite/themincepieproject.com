module FrankHelpers

  def in_groups_of(collection, number, fill_with = "")
      padding = (number - collection.size % number) % number
      collection = collection.dup.concat([fill_with] * padding)

    if block_given?
      collection.each_slice(number) { |slice| yield(slice) }
    end
  end

end
