require 'csv'
require 'date'

loc_i = [18,19]
date_i = 30
CSV.foreach(ARGV[0]) do |row|
    loc = row.values_at(*loc_i).map(&:to_f)
    
    # filter data from jervis bay
    next if loc[1] > 150
    
    # Parse the date
    begin
        d = Date.parse(row[date_i])
    rescue
    else
        output = loc << d.to_s
        print output
        puts ","
    end
end
